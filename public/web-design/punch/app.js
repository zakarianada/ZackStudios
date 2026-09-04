const state = {
  locale: localStorage.getItem('punchLocale') || 'fr',
  locations: [],
  plans: [],
  classes: [],
  activeProgram: 'bodybuilding',
  classFilter: 'all',
  selectedClub: 'tachfine',
  selectedPlan: 'total',
  map: null,
  markers: new Map(),
  userLocation: null
};

const t = {
  fr: {
    topStrip: 'OUVERT 7J/7 · 06:00 — 23:00',
    navExperience: 'Expérience', navPrograms: 'Entraînement', navClubs: 'Clubs', navPlans: 'Abonnements', navApp: 'Punch App',
    findClub: 'Trouver un club', joinNow: 'Devenir membre',
    heroEyebrow: 'BODYBUILDING · FITNESS · COMBAT', heroLine1: 'FIND YOUR', heroLine2: 'PURPOSE.',
    heroLead: 'Plus qu’une salle. Un terrain pour construire votre force, votre discipline et votre communauté.',
    startJourney: 'Commencer maintenant', discoverPunch: 'Découvrir Punch', discoverSub: 'L’expérience Dar Lkbira',
    nearestClub: 'VOTRE CLUB', openToday: 'Ouvert aujourd’hui', heroPanelKicker: '5 clubs autour de Casablanca', useLocation: 'Utiliser ma position', viewMap: 'Voir la carte',
    statZones: 'espaces d’entraînement', statMachines: 'machines & équipements', statOpen: 'accès toute la semaine', statWomen: 'espace femmes dédié',
    experienceEyebrow: 'DAR LKBIRA · NOTRE CONCEPT', experienceTitle: 'CONSTRUIT POUR<br><em>VOUS DÉPASSER.</em>',
    experienceLead: 'Punch démocratise l’accès à des installations de qualité au Maroc avec une expérience complète : entraînement, coaching, combat, récupération, lounge et communauté.', becomePuncheur: 'Devenir Puncheur',
    feature1Kicker: 'ZONE FORCE', feature1Title: 'Bodybuilding sans compromis', feature1Text: 'Plate-loaded, racks, charges libres et machines guidées pour progresser de la première répétition au prochain PR.',
    feature2Kicker: 'COACHING', feature2Title: 'Des experts à vos côtés', feature2Text: 'Des coachs certifiés et expérimentés pour structurer votre progression et sécuriser votre technique.',
    feature3Kicker: '100% FEMMES', feature3Title: 'Votre espace, votre rythme', feature3Text: 'Des zones dédiées pensées pour l’autonomie, la confiance et le confort d’entraînement.',
    feature4Kicker: 'DAR LKBIRA', feature4Title: 'Entraînez-vous. Restez. Connectez-vous.', feature4Text: 'Healthy lounge, boutique, événements et moments de communauté : l’expérience continue après votre séance.', dailyAccess: 'accès quotidien', clubsNetwork: 'clubs réseau', community: 'communauté',
    programsEyebrow: 'CHOISISSEZ VOTRE TERRAIN', programsTitle: 'TRAIN. BUILD. <em>REPEAT.</em>', programsLead: 'Des disciplines différentes, une même exigence : progresser avec intention.',
    tabBodybuilding: 'Bodybuilding', tabFitness: 'Fitness', tabCombat: 'Combat', tabWomen: '100% Femmes', tryProgram: 'Choisir ce programme',
    todayClasses: 'COURS DU JOUR', scheduleTitle: 'Votre prochaine séance commence ici.', filterAll: 'Tous', filterStrength: 'Force', filterFitness: 'Fitness', filterCombat: 'Combat', filterWomen: 'Femmes', book: 'Réserver', min: 'min',
    clubsEyebrow: 'LE RÉSEAU PUNCH', clubsTitle: 'TROUVEZ VOTRE<br><em>HOME GYM.</em>', clubsLead: 'Explorez nos clubs autour de Casablanca, comparez les espaces et trouvez le plus proche de vous.', findNearest: 'Trouver le plus proche', searchClub: 'Rechercher un club...', mapLoading: 'Chargement de la carte…', mapFallback: 'Les clubs restent accessibles dans la liste.', mapLegend: 'Clubs autour de Casablanca', directions: 'Itinéraire', kmAway: 'km',
    plansEyebrow: 'UN PASS. VOTRE PROGRESSION.', plansTitle: 'CHOISISSEZ VOTRE <em>PASS.</em>', plansLead: 'Des formules simples, conçues pour vous donner accès à l’essentiel sans sacrifier l’expérience.', recommended: 'RECOMMANDÉ', perYear: '/ an', subscribe: 'Choisir ce pass', comparePlans: 'Comparer tous les plans',
    appEyebrow: 'PUNCH APP · COMING SOON', appTitle: 'VOTRE CLUB<br><em>DANS LA POCHE.</em>', appLead: 'La digitalisation au cœur de l’expérience : réservez, entraînez-vous, payez et restez connecté depuis une seule interface.', soonOn: 'Bientôt sur',
    communityKicker: 'PLUS QU’UN CLUB', communityTitle: 'VOTRE <em>DAR LKBIRA.</em>', communityText: 'Entraînez-vous, mangez, échangez, riez. Chez Punch, vous n’êtes pas un simple client : vous faites partie de la maison.', joinCommunity: 'Rejoindre la communauté',
    contactEyebrow: 'PRÊT À COMMENCER ?', contactTitle: 'VOTRE PROCHAINE<br><em>VERSION COMMENCE ICI.</em>', contactLead: 'Choisissez votre club, dites-nous votre objectif, et notre équipe vous recontacte.', callUs: 'Appelez-nous', visitClub: 'Visitez un club', fiveLocations: '5 emplacements', firstName: 'Prénom', lastName: 'Nom', phone: 'Téléphone', email: 'Email', chooseClub: 'Club', yourGoal: 'Votre objectif', consent: 'J’accepte d’être contacté par Punch au sujet de ma demande.', sendRequest: 'Envoyer ma demande',
    explore: 'Explorer', activities: 'Activités', footerTagline: 'Build a healthier Morocco. Stronger together.', newsletterTitle: 'RESTEZ DANS LE GAME.', newsletterText: 'Nouveaux clubs, événements, offres et programmes.', emailPlaceholder: 'Votre email', footerDemo: 'Concept full-stack FR / AR', adminDemo: 'Admin demo',
    joinLeftTitle: 'NO EXCUSES.<br><em>JUST PURPOSE.</em>', joinLeftText: 'Choisissez votre club et votre pass. L’équipe Punch vous recontacte pour finaliser votre adhésion.', stepOne: 'ÉTAPE 1 / 3 · VOTRE CLUB', chooseHomeGym: 'Choisissez votre <em>Home Gym.</em>', continue: 'Continuer', back: 'Retour', stepTwo: 'ÉTAPE 2 / 3 · VOTRE PASS', choosePlan: 'Choisissez votre <em>Pass.</em>', stepThree: 'ÉTAPE 3 / 3 · VOS COORDONNÉES', almostThere: 'Presque <em>chez vous.</em>', requestMembership: 'Demander mon adhésion',
    classBooking: 'RÉSERVATION DE COURS', fullName: 'Nom complet', date: 'Date', confirmBooking: 'Confirmer la demande',
    requestSuccess: 'Merci ! Votre demande a bien été enregistrée. L’équipe Punch vous recontactera.', requestError: 'Impossible d’envoyer la demande. Vérifiez vos informations.', newsletterSuccess: 'Inscription confirmée.', bookingSuccess: 'Demande de réservation enregistrée.', geolocationError: 'Votre position n’a pas pu être récupérée.', nearestFound: 'Club le plus proche :',
    goalMuscle: 'Prise de masse / hypertrophie', goalStrength: 'Force / performance', goalFatLoss: 'Perte de masse grasse', goalFitness: 'Remise en forme', goalCombat: 'Sports de combat', goalOther: 'Autre',
    planFeature_mixedFitness: 'Fitness espace mixte', planFeature_womenArea: 'Espace 100% femmes', planFeature_collective: 'Cours collectifs Les Mills & cross-training', planFeature_annex: 'Activités annexes sur réservation', planFeature_app: 'Application & fonctionnalités', planFeature_lounge: 'Healthy lounge', planFeature_shop: 'Boutique Punch', planFeature_fightArea: 'Fight area mixte & femmes', planFeature_fightingClasses: 'Cours collectifs fighting', planFeature_kidsSports: 'Judo, Kick-boxing & Taekwondo', planFeature_hours: 'Accès 06:00–23:00',
    appF1: 'Réservation des cours collectifs', appF2: 'Réservation de coach personnel', appF3: 'Vidéothèque & bonnes pratiques', appF4: 'Programmes adaptés à tous les niveaux', appF5: 'Wallet pour consommations & achats', appF6: 'Boutique, promos & alertes', appF7: 'Événements du réseau', appF8: 'Sondages & avis membres',
    selectClubFirst: 'Sélectionnez un club pour continuer.', selectPlanFirst: 'Sélectionnez un pass pour continuer.',
    allClubs: 'Tous les clubs', allLevels: 'Tous niveaux', beginner: 'Débutant', intermediate: 'Intermédiaire'
  },
  ar: {
    topStrip: 'مفتوح 7 أيام · 06:00 — 23:00',
    navExperience: 'التجربة', navPrograms: 'التدريب', navClubs: 'الأندية', navPlans: 'الاشتراكات', navApp: 'تطبيق Punch',
    findClub: 'ابحث عن نادٍ', joinNow: 'انضم الآن',
    heroEyebrow: 'كمال الأجسام · اللياقة · القتال', heroLine1: 'اكتشف', heroLine2: 'هدفك.',
    heroLead: 'أكثر من مجرد قاعة رياضية. مساحة لبناء قوتك وانضباطك ومجتمعك.',
    startJourney: 'ابدأ الآن', discoverPunch: 'اكتشف Punch', discoverSub: 'تجربة الدار الكبيرة',
    nearestClub: 'ناديك', openToday: 'مفتوح اليوم', heroPanelKicker: '5 أندية حول الدار البيضاء', useLocation: 'استخدم موقعي', viewMap: 'عرض الخريطة',
    statZones: 'مساحات تدريب', statMachines: 'آلات وتجهيزات', statOpen: 'دخول طوال الأسبوع', statWomen: 'فضاء مخصص للنساء',
    experienceEyebrow: 'الدار الكبيرة · مفهومنا', experienceTitle: 'صُمم لتتجاوز<br><em>حدودك.</em>',
    experienceLead: 'يهدف Punch إلى جعل المنشآت الرياضية عالية الجودة في متناول الجميع بالمغرب، من خلال تجربة تجمع التدريب والكوتشينغ والقتال والاستشفاء واللاونج والمجتمع.', becomePuncheur: 'انضم إلى Punch',
    feature1Kicker: 'منطقة القوة', feature1Title: 'كمال أجسام بلا تنازلات', feature1Text: 'أوزان حرة، راكات وآلات موجهة لتتقدم من أول تكرار إلى رقمك القياسي القادم.',
    feature2Kicker: 'الكوتشينغ', feature2Title: 'خبراء بجانبك', feature2Text: 'مدربون معتمدون وذوو خبرة لبناء تقدمك وتحسين تقنيتك بأمان.',
    feature3Kicker: '100% نساء', feature3Title: 'مساحتك، إيقاعك', feature3Text: 'مساحات مخصصة للاستقلالية والثقة والراحة أثناء التدريب.',
    feature4Kicker: 'الدار الكبيرة', feature4Title: 'تدرّب. ابقَ. تواصل.', feature4Text: 'لاونج صحي، متجر، فعاليات ومجتمع: التجربة تستمر بعد الحصة.', dailyAccess: 'دخول يومي', clubsNetwork: 'أندية بالشبكة', community: 'مجتمع واحد',
    programsEyebrow: 'اختر ميدانك', programsTitle: 'تدرّب. ابنِ. <em>كرّر.</em>', programsLead: 'تخصصات مختلفة، ومتطلب واحد: التقدم بهدف واضح.',
    tabBodybuilding: 'كمال الأجسام', tabFitness: 'اللياقة', tabCombat: 'القتال', tabWomen: '100% نساء', tryProgram: 'اختر هذا البرنامج',
    todayClasses: 'حصص اليوم', scheduleTitle: 'حصتك القادمة تبدأ هنا.', filterAll: 'الكل', filterStrength: 'القوة', filterFitness: 'اللياقة', filterCombat: 'القتال', filterWomen: 'نساء', book: 'احجز', min: 'د',
    clubsEyebrow: 'شبكة PUNCH', clubsTitle: 'اعثر على<br><em>ناديك.</em>', clubsLead: 'استكشف أنديتنا حول الدار البيضاء، قارن المساحات واعثر على الأقرب إليك.', findNearest: 'اعثر على الأقرب', searchClub: 'ابحث عن نادٍ...', mapLoading: 'جاري تحميل الخريطة…', mapFallback: 'يمكنك تصفح الأندية من القائمة.', mapLegend: 'أندية حول الدار البيضاء', directions: 'الاتجاهات', kmAway: 'كم',
    plansEyebrow: 'اشتراك واحد. تقدمك أنت.', plansTitle: 'اختر <em>اشتراكك.</em>', plansLead: 'باقات بسيطة تمنحك الوصول لما تحتاجه دون التنازل عن التجربة.', recommended: 'الأكثر اختياراً', perYear: '/ سنة', subscribe: 'اختر هذه الباقة', comparePlans: 'قارن جميع الباقات',
    appEyebrow: 'تطبيق PUNCH · قريباً', appTitle: 'ناديك<br><em>في جيبك.</em>', appLead: 'الرقمنة في قلب التجربة: احجز، تدرّب، ادفع وابقَ متصلاً من واجهة واحدة.', soonOn: 'قريباً على',
    communityKicker: 'أكثر من نادٍ', communityTitle: 'هذه <em>دارك الكبيرة.</em>', communityText: 'تدرّب، كل، تواصل واضحك. في Punch أنت لست مجرد زبون، بل جزء من الدار.', joinCommunity: 'انضم إلى المجتمع',
    contactEyebrow: 'مستعد للبدء؟', contactTitle: 'نسختك القادمة<br><em>تبدأ هنا.</em>', contactLead: 'اختر ناديك، أخبرنا بهدفك، وسيتواصل معك فريقنا.', callUs: 'اتصل بنا', visitClub: 'زر أحد الأندية', fiveLocations: '5 مواقع', firstName: 'الاسم الشخصي', lastName: 'النسب', phone: 'الهاتف', email: 'البريد الإلكتروني', chooseClub: 'النادي', yourGoal: 'هدفك', consent: 'أوافق على أن يتواصل معي فريق Punch بخصوص طلبي.', sendRequest: 'أرسل طلبي',
    explore: 'استكشف', activities: 'الأنشطة', footerTagline: 'نبني مغرباً أكثر صحة. أقوى معاً.', newsletterTitle: 'ابقَ في اللعبة.', newsletterText: 'أندية جديدة، فعاليات، عروض وبرامج.', emailPlaceholder: 'بريدك الإلكتروني', footerDemo: 'تصور Full-stack بالفرنسية والعربية', adminDemo: 'لوحة الإدارة',
    joinLeftTitle: 'لا أعذار.<br><em>فقط الهدف.</em>', joinLeftText: 'اختر ناديك واشتراكك. سيتواصل معك فريق Punch لإتمام الانضمام.', stepOne: 'الخطوة 1 / 3 · ناديك', chooseHomeGym: 'اختر <em>ناديك.</em>', continue: 'متابعة', back: 'رجوع', stepTwo: 'الخطوة 2 / 3 · الاشتراك', choosePlan: 'اختر <em>اشتراكك.</em>', stepThree: 'الخطوة 3 / 3 · بياناتك', almostThere: 'أنت على وشك <em>الانضمام.</em>', requestMembership: 'أرسل طلب الاشتراك',
    classBooking: 'حجز حصة', fullName: 'الاسم الكامل', date: 'التاريخ', confirmBooking: 'تأكيد الطلب',
    requestSuccess: 'شكراً! تم تسجيل طلبك وسيتواصل معك فريق Punch.', requestError: 'تعذر إرسال الطلب. تحقق من معلوماتك.', newsletterSuccess: 'تم تسجيلك.', bookingSuccess: 'تم تسجيل طلب الحجز.', geolocationError: 'تعذر تحديد موقعك.', nearestFound: 'أقرب نادٍ:',
    goalMuscle: 'زيادة الكتلة العضلية', goalStrength: 'القوة والأداء', goalFatLoss: 'خفض الدهون', goalFitness: 'اللياقة العامة', goalCombat: 'رياضات قتالية', goalOther: 'هدف آخر',
    planFeature_mixedFitness: 'فضاء لياقة مختلط', planFeature_womenArea: 'فضاء 100% نساء', planFeature_collective: 'حصص جماعية Les Mills وCross-training', planFeature_annex: 'أنشطة إضافية بالحجز', planFeature_app: 'التطبيق وجميع خصائصه', planFeature_lounge: 'لاونج صحي', planFeature_shop: 'متجر Punch', planFeature_fightArea: 'منطقة قتال مختلطة وللنساء', planFeature_fightingClasses: 'حصص قتالية جماعية', planFeature_kidsSports: 'جودو، كيك بوكسينغ وتايكواندو', planFeature_hours: 'الدخول من 06:00 إلى 23:00',
    appF1: 'حجز الحصص الجماعية', appF2: 'حجز مدرب شخصي', appF3: 'مكتبة فيديو وأفضل الممارسات', appF4: 'برامج لجميع المستويات', appF5: 'محفظة للدفع والمشتريات', appF6: 'متجر وعروض وتنبيهات', appF7: 'فعاليات الشبكة', appF8: 'استبيانات وآراء الأعضاء',
    selectClubFirst: 'اختر نادياً للمتابعة.', selectPlanFirst: 'اختر اشتراكاً للمتابعة.',
    allClubs: 'جميع الأندية', allLevels: 'جميع المستويات', beginner: 'مبتدئ', intermediate: 'متوسط'
  }
};

const programs = {
  bodybuilding: {
    index: '01', kicker: { fr: 'STRENGTH · HYPERTROPHY', ar: 'القوة · التضخيم' }, title: { fr: 'BODYBUILDING', ar: 'كمال الأجسام' },
    description: { fr: 'Un plateau pensé pour la progression mesurable : puissance, hypertrophie, technique et constance.', ar: 'مساحة مصممة لتقدم قابل للقياس: قوة، تضخيم، تقنية واستمرارية.' },
    tags: { fr: ['Charges libres', 'Machines guidées', 'Power racks', 'Coaching'], ar: ['أوزان حرة', 'آلات موجهة', 'Power racks', 'كوتشينغ'] },
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1800&q=86'
  },
  fitness: {
    index: '02', kicker: { fr: 'MOVE · SWEAT · CONDITION', ar: 'حركة · مجهود · لياقة' }, title: { fr: 'FITNESS', ar: 'اللياقة' },
    description: { fr: 'Cardio, cours collectifs, cross-training et entraînement fonctionnel pour un corps plus capable au quotidien.', ar: 'كارديو، حصص جماعية، كروس ترينينغ وتدريب وظيفي لجسم أكثر قدرة كل يوم.' },
    tags: { fr: ['Cardio', 'Cross-training', 'Les Mills', 'Mobilité'], ar: ['كارديو', 'كروس ترينينغ', 'Les Mills', 'مرونة'] },
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1800&q=86'
  },
  combat: {
    index: '03', kicker: { fr: 'TECHNIQUE · CONTROL · POWER', ar: 'تقنية · تحكم · قوة' }, title: { fr: 'COMBAT', ar: 'القتال' },
    description: { fr: 'Kickboxing, boxe, MMA et disciplines de combat dans une fight area pensée pour apprendre, répéter et performer.', ar: 'كيك بوكسينغ، ملاكمة وMMA داخل منطقة قتال للتعلم والتكرار والتطور.' },
    tags: { fr: ['Kickboxing', 'Boxe', 'MMA', 'Fight classes'], ar: ['كيك بوكسينغ', 'ملاكمة', 'MMA', 'حصص قتالية'] },
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1800&q=86'
  },
  women: {
    index: '04', kicker: { fr: 'PRIVATE · STRONG · YOUR SPACE', ar: 'خصوصية · قوة · مساحتك' }, title: { fr: '100% FEMMES', ar: '100% نساء' },
    description: { fr: 'Un environnement dédié avec équipements, coaching et séances conçus pour s’entraîner en confiance.', ar: 'بيئة مخصصة مع تجهيزات وكوتشينغ وحصص تمنحك الثقة والراحة في التدريب.' },
    tags: { fr: ['Espace dédié', 'Coaching', 'Fitness', 'Strength'], ar: ['فضاء مخصص', 'كوتشينغ', 'لياقة', 'قوة'] },
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1800&q=86'
  }
};

const planFeatureKeys = {
  '06:00–23:00': 'planFeature_hours',
  mixedFitness: 'planFeature_mixedFitness', womenArea: 'planFeature_womenArea', collective: 'planFeature_collective', annex: 'planFeature_annex', app: 'planFeature_app', lounge: 'planFeature_lounge', shop: 'planFeature_shop', fightArea: 'planFeature_fightArea', fightingClasses: 'planFeature_fightingClasses', kidsSports: 'planFeature_kidsSports'
};

const appFeatureKeys = ['appF1','appF2','appF3','appF4','appF5','appF6','appF7','appF8'];
const goalKeys = ['goalMuscle','goalStrength','goalFatLoss','goalFitness','goalCombat','goalOther'];

function tr(key) { return t[state.locale][key] ?? t.fr[key] ?? key; }

function setLocale(locale) {
  state.locale = locale;
  localStorage.setItem('punchLocale', locale);
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  document.querySelector('#langSwitch .active-lang').textContent = locale === 'ar' ? 'ع' : 'FR';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = tr(el.dataset.i18n);
    if (value.includes('<')) el.innerHTML = value;
    else el.textContent = value;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => el.placeholder = tr(el.dataset.i18nPlaceholder));
  renderPrograms();
  renderClasses();
  renderLocations();
  renderPlans();
  renderAppFeatures();
  populateSelects();
  if (state.map) refreshMapPopups();
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function addressOf(loc) { return state.locale === 'ar' ? loc.addressAr : loc.addressFr; }
function planName(plan) { return state.locale === 'ar' ? plan.nameAr : plan.nameFr; }
function planPeriod(plan) { return state.locale === 'ar' ? plan.periodAr : plan.periodFr; }
function classTitle(c) { return state.locale === 'ar' ? c.titleAr : c.titleFr; }
function classLevel(c) {
  if (state.locale === 'fr') return c.level;
  if (c.level === 'Débutant') return tr('beginner');
  if (c.level === 'Intermédiaire') return tr('intermediate');
  return tr('allLevels');
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2-lat1) * Math.PI / 180;
  const dLon = (lon2-lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

async function loadData() {
  const demo = window.PUNCH_DEMO_DATA || { locations:[], plans:[], classes:[] };
  state.locations = demo.locations;
  state.plans = demo.plans;
  state.classes = demo.classes;

  renderPrograms();
  renderClasses();
  renderLocations();
  renderPlans();
  renderAppFeatures();
  populateSelects();
  initMap();
}

function renderPrograms() {
  const p = programs[state.activeProgram];
  const photo = document.getElementById('programPhoto');
  if (!photo) return;
  photo.style.backgroundImage = `url('${p.image}')`;
  document.getElementById('programIndex').textContent = p.index;
  document.getElementById('programKicker').textContent = p.kicker[state.locale];
  document.getElementById('programTitle').textContent = p.title[state.locale];
  document.getElementById('programDescription').textContent = p.description[state.locale];
  document.getElementById('programTags').innerHTML = p.tags[state.locale].map(tag => `<span>${escapeHtml(tag)}</span>`).join('');
}

function renderClasses() {
  const list = document.getElementById('classList');
  if (!list) return;
  const filtered = state.classFilter === 'all' ? state.classes : state.classes.filter(c => c.category === state.classFilter);
  list.innerHTML = filtered.map(c => `
    <div class="class-row">
      <div class="class-time">${escapeHtml(c.time)}</div>
      <div class="class-name"><strong>${escapeHtml(classTitle(c))}</strong><small>${escapeHtml(c.coach)}</small></div>
      <div class="class-meta"><small>${escapeHtml(classLevel(c))}</small><strong>${c.duration} ${tr('min')}</strong></div>
      <div><span class="class-category">${escapeHtml(c.category)}</span></div>
      <button class="class-book" type="button" data-book-class="${c.id}">${tr('book')}</button>
    </div>
  `).join('') || `<div style="padding:30px 4px;color:#777;font-size:12px">—</div>`;
  list.querySelectorAll('[data-book-class]').forEach(btn => btn.addEventListener('click', () => openBooking(Number(btn.dataset.bookClass))));
}

function locationDistance(loc) {
  if (!state.userLocation) return null;
  return haversineKm(state.userLocation.lat, state.userLocation.lng, loc.lat, loc.lng);
}

function renderLocations(filter = '') {
  const query = filter.trim().toLowerCase();
  const visible = state.locations.filter(loc => `${loc.name} ${loc.city} ${addressOf(loc)}`.toLowerCase().includes(query));
  const list = document.getElementById('clubList');
  const carousel = document.getElementById('clubCarousel');
  if (!list || !carousel) return;

  list.innerHTML = visible.map(loc => {
    const dist = locationDistance(loc);
    return `
      <button type="button" class="club-list-item ${state.selectedClub === loc.id ? 'active' : ''}" data-club-id="${loc.id}">
        <div class="club-list-top"><strong>${escapeHtml(loc.name)}</strong>${dist == null ? '' : `<span class="distance">${dist.toFixed(1)} ${tr('kmAway')}</span>`}</div>
        <p>${escapeHtml(addressOf(loc))}</p>
        <small>${escapeHtml(loc.hours)} · ${escapeHtml(loc.phone)}</small>
      </button>`;
  }).join('');

  carousel.innerHTML = visible.map((loc, i) => `
    <article class="club-card">
      <div class="club-card-bg" style="background-image:url('${loc.image}')"></div>
      <div class="club-card-content">
        <span class="club-index">${String(i+1).padStart(2,'0')} · ${escapeHtml(loc.city)}</span>
        <h3>${escapeHtml(loc.name.replace('Punch ', ''))}</h3>
        <p>${escapeHtml(addressOf(loc))}</p>
        <button type="button" data-club-card="${loc.id}">${tr('viewMap')} <svg viewBox="0 0 24 24"><path d="M5 12h14M14 7l5 5-5 5"/></svg></button>
      </div>
    </article>`).join('');

  list.querySelectorAll('[data-club-id]').forEach(btn => btn.addEventListener('click', () => selectClub(btn.dataset.clubId, true)));
  carousel.querySelectorAll('[data-club-card]').forEach(btn => btn.addEventListener('click', () => {
    selectClub(btn.dataset.clubCard, true);
    document.getElementById('clubs').scrollIntoView({ behavior:'smooth' });
  }));
}

function selectClub(id, pan = false) {
  state.selectedClub = id;
  document.querySelectorAll('.club-list-item').forEach(x => x.classList.toggle('active', x.dataset.clubId === id));
  document.querySelectorAll('.join-club-option').forEach(x => x.classList.toggle('selected', x.dataset.joinClub === id));
  const loc = state.locations.find(x => x.id === id);
  if (loc) {
    document.getElementById('nearestClubName').textContent = loc.name;
    document.getElementById('nearestClubMeta').textContent = `${loc.hours} · ${loc.city}`;
    if (pan && state.map) {
      state.map.flyTo([loc.lat, loc.lng], 14, { duration:.7 });
      state.markers.get(id)?.openPopup();
    }
  }
}

function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl || !state.locations.length) return;
  if (!window.L) {
    document.getElementById('mapFallback').style.zIndex = 3;
    return;
  }
  state.map = L.map('map', { zoomControl:false, scrollWheelZoom:false }).setView([33.54, -7.66], 10);
  L.control.zoom({ position: state.locale === 'ar' ? 'topright' : 'topleft' }).addTo(state.map);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(state.map);
  document.getElementById('mapFallback').style.display = 'none';

  state.locations.forEach(loc => {
    const icon = L.divIcon({ className:'', html:`<div class="punch-pin">P</div>`, iconSize:[38,38], iconAnchor:[19,19], popupAnchor:[0,-16] });
    const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(state.map);
    marker.bindPopup(mapPopupHtml(loc));
    marker.on('click', () => selectClub(loc.id, false));
    state.markers.set(loc.id, marker);
  });
}

function mapPopupHtml(loc) {
  return `<div class="map-popup"><strong>${escapeHtml(loc.name)}</strong><span>${escapeHtml(addressOf(loc))}</span><b>${escapeHtml(loc.hours)} · ${escapeHtml(loc.phone)}</b></div>`;
}
function refreshMapPopups() {
  state.locations.forEach(loc => state.markers.get(loc.id)?.setPopupContent(mapPopupHtml(loc)));
  renderLocations(document.getElementById('clubSearch')?.value || '');
}

function featureLabel(feature) { return tr(planFeatureKeys[feature] || feature); }

function renderPlans() {
  const grid = document.getElementById('planGrid');
  if (!grid) return;
  grid.innerHTML = state.plans.map(plan => `
    <article class="plan-card ${plan.recommended ? 'recommended' : ''}">
      ${plan.recommended ? `<div class="plan-ribbon">${tr('recommended')}</div>` : ''}
      <div class="plan-top"><div><strong class="plan-name">${escapeHtml(planName(plan))}</strong><span class="plan-period">${escapeHtml(planPeriod(plan))}</span></div></div>
      <div class="plan-price"><strong>${plan.price}</strong><span>DH</span><small>${tr('perYear')}</small></div>
      <ul class="plan-features">${plan.features.map(f => `<li>${escapeHtml(featureLabel(f))}</li>`).join('')}</ul>
      <button class="plan-cta" type="button" data-plan-open="${plan.id}">${tr('subscribe')}</button>
    </article>
  `).join('');
  grid.querySelectorAll('[data-plan-open]').forEach(btn => btn.addEventListener('click', () => openJoin(btn.dataset.planOpen)));
  renderCompareTable();
  renderJoinPlans();
}

function renderCompareTable() {
  const target = document.getElementById('compareTable');
  if (!target || !state.plans.length) return;
  const allFeatures = [...new Set(state.plans.flatMap(p => p.features))];
  target.innerHTML = `
    <div class="compare-row header"><div>ACCESS</div>${state.plans.map(p => `<div>${escapeHtml(planName(p))}</div>`).join('')}</div>
    ${allFeatures.map(f => `<div class="compare-row"><div>${escapeHtml(featureLabel(f))}</div>${state.plans.map(p => `<div class="${p.features.includes(f) ? 'yes' : 'no'}">${p.features.includes(f) ? '✓' : '—'}</div>`).join('')}</div>`).join('')}
  `;
}

function renderAppFeatures() {
  const el = document.getElementById('appFeatures');
  if (!el) return;
  el.innerHTML = appFeatureKeys.map(k => `<div class="app-feature"><i></i><span>${escapeHtml(tr(k))}</span></div>`).join('');
}

function populateSelects() {
  const clubOptions = state.locations.map(l => `<option value="${escapeHtml(l.id)}">${escapeHtml(l.name)}</option>`).join('');
  ['contactClub','bookingClub'].forEach(id => { const el = document.getElementById(id); if (el) el.innerHTML = clubOptions; });
  const goalOptions = goalKeys.map(k => `<option value="${k}">${escapeHtml(tr(k))}</option>`).join('');
  ['goalSelect','joinGoal'].forEach(id => { const el = document.getElementById(id); if (el) el.innerHTML = goalOptions; });
  renderJoinClubs();
  renderJoinPlans();
}

function renderJoinClubs() {
  const el = document.getElementById('joinClubs');
  if (!el) return;
  el.innerHTML = state.locations.map(loc => `
    <div class="join-club-option ${state.selectedClub === loc.id ? 'selected':''}" data-join-club="${loc.id}">
      <strong>${escapeHtml(loc.name)}</strong><span>${escapeHtml(addressOf(loc))}<br>${escapeHtml(loc.hours)}</span>
    </div>
  `).join('');
  el.querySelectorAll('[data-join-club]').forEach(x => x.addEventListener('click', () => selectClub(x.dataset.joinClub, false)));
}

function renderJoinPlans() {
  const el = document.getElementById('joinPlans');
  if (!el) return;
  el.innerHTML = state.plans.map(plan => `
    <div class="join-plan-option ${state.selectedPlan === plan.id ? 'selected':''}" data-join-plan="${plan.id}">
      <div><strong>${escapeHtml(planName(plan))}</strong><span>${escapeHtml(planPeriod(plan))} · ${plan.features.length} access</span></div>
      <b>${plan.price}<small> DH</small></b>
    </div>
  `).join('');
  el.querySelectorAll('[data-join-plan]').forEach(x => x.addEventListener('click', () => {
    state.selectedPlan = x.dataset.joinPlan;
    el.querySelectorAll('[data-join-plan]').forEach(y => y.classList.toggle('selected', y.dataset.joinPlan === state.selectedPlan));
  }));
}

function openJoin(planId) {
  if (planId) state.selectedPlan = planId;
  renderJoinPlans();
  renderJoinClubs();
  setJoinStep(planId ? 2 : 1);
  const modal = document.getElementById('joinModal');
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}
function closeJoin() {
  const modal = document.getElementById('joinModal');
  modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
}
function setJoinStep(step) {
  document.querySelectorAll('.join-step').forEach(x => x.classList.toggle('active', Number(x.dataset.step) === Number(step)));
  document.querySelectorAll('[data-step-dot]').forEach(x => x.classList.toggle('active', Number(x.dataset.stepDot) <= Number(step)));
  document.querySelector('.join-right')?.scrollTo({ top:0, behavior:'smooth' });
}

function openBooking(classId) {
  const c = state.classes.find(x => x.id === classId);
  if (!c) return;
  document.getElementById('bookingClassId').value = c.id;
  document.getElementById('bookingTitle').textContent = classTitle(c);
  document.getElementById('bookingMeta').textContent = `${c.time} · ${c.duration} ${tr('min')} · ${c.coach}`;
  const date = new Date();
  const yyyy = date.getFullYear(), mm = String(date.getMonth()+1).padStart(2,'0'), dd = String(date.getDate()).padStart(2,'0');
  document.getElementById('bookingDate').value = `${yyyy}-${mm}-${dd}`;
  const modal = document.getElementById('bookingModal');
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
}
function closeBooking() {
  const modal = document.getElementById('bookingModal');
  modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open');
}

async function postJson(url, payload) {
  const res = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
  if (!res.ok) throw new Error('REQUEST_FAILED');
  return res.json();
}

function showResponse(el, message, ok=true) {
  el.textContent = message;
  el.classList.remove('success','error');
  el.classList.add(ok ? 'success' : 'error');
}
function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message; el.classList.add('show');
  clearTimeout(toast._timer); toast._timer = setTimeout(() => el.classList.remove('show'), 3200);
}

function locateUser() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('NO_GEO'));
    navigator.geolocation.getCurrentPosition(pos => {
      state.userLocation = { lat:pos.coords.latitude, lng:pos.coords.longitude };
      const nearest = [...state.locations].sort((a,b) => locationDistance(a)-locationDistance(b))[0];
      if (nearest) {
        selectClub(nearest.id, true);
        renderLocations(document.getElementById('clubSearch')?.value || '');
        toast(`${tr('nearestFound')} ${nearest.name} · ${locationDistance(nearest).toFixed(1)} ${tr('kmAway')}`);
      }
      resolve(nearest);
    }, err => reject(err), { enableHighAccuracy:false, timeout:8000, maximumAge:120000 });
  });
}

function setupInteractions() {
  document.getElementById('langSwitch').addEventListener('click', () => setLocale(state.locale === 'fr' ? 'ar' : 'fr'));

  document.querySelectorAll('[data-scroll]').forEach(btn => btn.addEventListener('click', () => {
    document.querySelector(btn.dataset.scroll)?.scrollIntoView({ behavior:'smooth' });
  }));
  document.querySelectorAll('[data-open-join]').forEach(btn => btn.addEventListener('click', () => openJoin()));
  document.querySelectorAll('[data-close-modal]').forEach(btn => btn.addEventListener('click', closeJoin));
  document.querySelectorAll('[data-close-booking]').forEach(btn => btn.addEventListener('click', closeBooking));

  document.querySelectorAll('.program-tab').forEach(btn => btn.addEventListener('click', () => {
    state.activeProgram = btn.dataset.program;
    document.querySelectorAll('.program-tab').forEach(x => { x.classList.toggle('active', x === btn); x.setAttribute('aria-selected', x === btn ? 'true':'false'); });
    renderPrograms();
  }));

  document.querySelectorAll('#classFilters button').forEach(btn => btn.addEventListener('click', () => {
    state.classFilter = btn.dataset.filter;
    document.querySelectorAll('#classFilters button').forEach(x => x.classList.toggle('active', x === btn));
    renderClasses();
  }));

  document.getElementById('compareToggle').addEventListener('click', () => {
    document.getElementById('compareTableWrap').classList.toggle('open');
    document.getElementById('compareToggle').classList.toggle('open');
  });

  document.getElementById('clubSearch').addEventListener('input', e => renderLocations(e.target.value));
  document.getElementById('locateBtn').addEventListener('click', () => locateUser().catch(() => toast(tr('geolocationError'))));
  document.getElementById('heroLocateBtn').addEventListener('click', () => locateUser().catch(() => toast(tr('geolocationError'))));

  document.querySelectorAll('.next-step').forEach(btn => btn.addEventListener('click', () => {
    const target = Number(btn.dataset.next);
    if (target === 2 && !state.selectedClub) return toast(tr('selectClubFirst'));
    if (target === 3 && !state.selectedPlan) return toast(tr('selectPlanFirst'));
    setJoinStep(target);
  }));
  document.querySelectorAll('.back-step').forEach(btn => btn.addEventListener('click', () => setJoinStep(Number(btn.dataset.back))));

  const menuBtn = document.getElementById('menuBtn'), menu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', () => {
    const open = !menu.classList.contains('open'); menu.classList.toggle('open', open); menuBtn.classList.toggle('active', open); menuBtn.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('[data-mobile-link]').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); menuBtn.classList.remove('active'); menuBtn.setAttribute('aria-expanded','false'); }));

  window.addEventListener('scroll', () => document.getElementById('siteHeader').classList.toggle('scrolled', window.scrollY > 80), { passive:true });
  window.addEventListener('mousemove', e => { const g=document.getElementById('cursorGlow'); g.style.left=`${e.clientX}px`; g.style.top=`${e.clientY}px`; }, { passive:true });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') { closeJoin(); closeBooking(); } });

  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }), { threshold:.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  setupForms();
}

function setupForms() {
  document.getElementById('contactForm').addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget); const out = document.getElementById('contactResponse');
    try {
      await postJson('/api/leads', { firstName:fd.get('firstName'), lastName:fd.get('lastName'), phone:fd.get('phone'), email:fd.get('email'), club:fd.get('club'), goal:fd.get('goal'), locale:state.locale });
      showResponse(out, tr('requestSuccess'), true); e.currentTarget.reset(); populateSelects();
    } catch { showResponse(out, tr('requestError'), false); }
  });

  document.getElementById('joinForm').addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget); const out = document.getElementById('joinResponse');
    try {
      await postJson('/api/leads', { firstName:fd.get('firstName'), lastName:fd.get('lastName'), phone:fd.get('phone'), email:fd.get('email'), club:state.selectedClub, plan:state.selectedPlan, goal:fd.get('goal'), locale:state.locale });
      showResponse(out, tr('requestSuccess'), true); toast(tr('requestSuccess')); setTimeout(closeJoin, 1500);
    } catch { showResponse(out, tr('requestError'), false); }
  });

  document.getElementById('bookingForm').addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget); const out = document.getElementById('bookingResponse');
    try {
      await postJson('/api/bookings', { name:fd.get('name'), phone:fd.get('phone'), classId:Number(fd.get('classId')), club:fd.get('club'), date:fd.get('date'), locale:state.locale });
      showResponse(out, tr('bookingSuccess'), true); toast(tr('bookingSuccess')); setTimeout(closeBooking, 1300);
    } catch { showResponse(out, tr('requestError'), false); }
  });

  document.getElementById('newsletterForm').addEventListener('submit', async e => {
    e.preventDefault(); const fd=new FormData(e.currentTarget); const out=document.getElementById('newsletterResponse');
    try { await postJson('/api/newsletter', { email:fd.get('email') }); out.textContent=tr('newsletterSuccess'); e.currentTarget.reset(); }
    catch { out.textContent=tr('requestError'); }
  });
}

(async function init() {
  setupInteractions();
  setLocale(state.locale);
  await loadData();
  setLocale(state.locale);
  selectClub(state.selectedClub, false);
})();
