import math, random, wave, struct

SR = 44100
DURATION = 30.0
N = int(SR * DURATION)
left = [0.0] * N
right = [0.0] * N
random.seed(27)

def add_sample(i, v, pan=0.0):
    if 0 <= i < N:
        lg = math.sqrt((1.0-pan)*0.5)
        rg = math.sqrt((1.0+pan)*0.5)
        left[i] += v * lg
        right[i] += v * rg

def add_tone(start, dur, f0, f1=None, amp=0.2, pan=0.0, decay=5.0, kind='sine'):
    s0 = int(start*SR); n = int(dur*SR)
    phase = 0.0
    for j in range(n):
        t = j / SR
        u = j / max(1, n-1)
        f = f0 if f1 is None else f0 * ((f1/f0) ** u)
        phase += 2*math.pi*f/SR
        env = math.exp(-decay*t) if decay > 0 else 1.0
        if kind == 'square':
            sig = 1.0 if math.sin(phase) >= 0 else -1.0
        else:
            sig = math.sin(phase)
        add_sample(s0+j, sig*env*amp, pan)

def add_noise(start, dur, amp=0.08, pan=0.0, decay=15.0):
    s0 = int(start*SR); n = int(dur*SR)
    prev = 0.0
    for j in range(n):
        t = j/SR
        raw = random.uniform(-1,1)
        # crude bright high-pass texture
        hp = raw - 0.82*prev
        prev = raw
        env = math.exp(-decay*t)
        add_sample(s0+j, hp*env*amp, pan)

def add_whoosh(start, dur=0.32, amp=0.09, pan=0.0):
    s0 = int(start*SR); n = int(dur*SR)
    phase = 0.0
    for j in range(n):
        u = j/max(1,n-1)
        env = math.sin(math.pi*u)**1.7
        f = 280 + 5200*(u*u)
        phase += 2*math.pi*f/SR
        sig = 0.65*random.uniform(-1,1) + 0.35*math.sin(phase)
        add_sample(s0+j, sig*env*amp, pan)

# low cinematic bed
for i in range(N):
    t = i/SR
    v = 0.028*math.sin(2*math.pi*55*t) + 0.016*math.sin(2*math.pi*82.41*t)
    left[i] += v
    right[i] += v

# 132 bpm beat
beat = 60/132.0
b = 0
x = 0.0
while x < DURATION:
    add_tone(x, 0.28, 145, 45, amp=0.42, decay=11.0)
    if b % 2 == 1:
        add_noise(x, 0.18, amp=0.12, decay=18.0)
        add_tone(x, 0.12, 190, amp=0.055, decay=24.0)
    add_noise(x, 0.055, amp=0.025, pan=-0.25, decay=55.0)
    add_noise(x+beat/2, 0.055, amp=0.025, pan=0.25, decay=55.0)
    b += 1
    x += beat

# cut impacts + whooshes every 2.5 seconds
for idx, t in enumerate([2.5,5,7.5,10,12.5,15,17.5,20,22.5,25,27.5]):
    add_whoosh(t-0.24, 0.28, 0.07, -0.35 if idx%2 else 0.35)
    add_tone(t, 0.42, 82, 36, amp=0.34, decay=8.5)
    add_noise(t, 0.12, amp=0.10, decay=22.0)

# rising energy final third
notes = [110, 123.47, 146.83, 164.81, 196, 220]
for j in range(14):
    t = 20 + j*0.68
    add_tone(t, 0.30, notes[j%len(notes)], amp=0.055, decay=7.0, pan=-0.35 if j%2==0 else 0.35)

# final hit
add_whoosh(28.95, 0.55, 0.13)
add_tone(29.25, 0.72, 72, 29, amp=0.50, decay=4.0)

# master soft clip and fades
fade_in = int(0.18*SR)
fade_out = int(0.45*SR)
peak = 0.0
for i in range(N):
    if i < fade_in:
        g = i/max(1,fade_in)
    elif i > N-fade_out:
        g = max(0.0,(N-i)/fade_out)
    else:
        g = 1.0
    left[i] = math.tanh(left[i]*1.25)*g
    right[i] = math.tanh(right[i]*1.25)*g
    peak = max(peak, abs(left[i]), abs(right[i]))
scale = 0.92/max(peak,1e-9)

with wave.open('soundtrack.wav','wb') as wf:
    wf.setnchannels(2); wf.setsampwidth(2); wf.setframerate(SR)
    frames = bytearray()
    for l,r in zip(left,right):
        frames += struct.pack('<hh', int(max(-1,min(1,l*scale))*32767), int(max(-1,min(1,r*scale))*32767))
    wf.writeframes(frames)
print('soundtrack.wav created')
