// All copy below is taken from https://www.fortiushealthclinic.co/ (Nov 2026).
// Obvious spelling mistakes were corrected; wording is otherwise unchanged.

export const CDN = "https://fortiushealthclinic.b-cdn.net";

export const site = {
  name: "Fortius Health Clinic",
  tagline: "for Happy Healthy Lives",
  url: "https://www.fortiushealthclinic.co",
  blogUrl: "https://www.fortiushealthclinic.co/blog",
  title: "Best Sexologist Hospital in Bangalore | Sexologist Doctor Bangalore",
  description:
    "Fortius Health Clinic specializes in treating men’s sexual health in Bangalore with expert care, confidentiality, and data security. Led by award-winning sexologist Dr. Mujahid Jameel.",
  heroTitle: "Sexual Health Clinic in Bangalore",
  heroText:
    "We specialize in treating men’s sexual health with expert care, confidentiality, and data security.",
  h1: "Best Sexologist Hospital in Bangalore",
  footerBlurb:
    "Our vision is to guide you on your journey to parenthood and support you every step of the way toward building a family. At Fortius Health Clinic, we focus on personalized care, holistic healing, and treatment solutions tailored to your needs. As a trusted sexologist in Bangalore and dedicated sexual health clinic in Bangalore, we aim to provide compassionate guidance and quality sexual health treatment in Bangalore, helping individuals and couples move toward a healthier, happier future. Stay connected with us for the latest updates on sexual health and wellness.",
  emails: ["fortiushealthclinic@gmail.com", "Info@fortiushealthclinic.com"],
  phone: { display: "+91 99008 48660", tel: "+919900848660" },
  whatsapp: "919900848660",
  branches: [
    {
      id: "richards-town",
      name: "Richards Town",
      label: "Main Clinic",
      address: "#7/5, Clarke Road, Richards Town, Bangalore - 560005, Karnataka, India",
      phone: { display: "+91 99008 48660", tel: "+919900848660" },
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.4839195603804!2d77.61713499999999!3d13.004826300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16f64236502d%3A0xca19666e5e1f0184!2sFORTIUS%20HEALTH%20CLINIC!5e0!3m2!1sen!2sin!4v1673613034936!5m2!1sen!2sin",
      directions: "https://www.google.com/maps/search/?api=1&query=FORTIUS+HEALTH+CLINIC+Clarke+Road+Richards+Town+Bangalore",
    },
    {
      id: "hsr-layout",
      name: "HSR Layout",
      label: "Branch",
      address: "Ground floor, No.133/1, 10th main, 14th cross, 6th sector, HSR layout, Bangalore - 560102",
      phone: { display: "+91 96867 59649", tel: "+919686759649" },
      map: "https://www.google.com/maps?q=133/1,+10th+Main,+14th+Cross,+6th+Sector,+HSR+Layout,+Bangalore+560102&output=embed",
      directions: "https://www.google.com/maps/search/?api=1&query=133%2F1+10th+Main+14th+Cross+6th+Sector+HSR+Layout+Bangalore+560102",
    },
  ],
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/fortiushealthclinic" },
    { name: "Instagram", href: "https://www.instagram.com/fortiushealthclinicblr/" },
    { name: "Twitter", href: "https://twitter.com/FortiusClinic" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/fortius-health-clinic-4530b6254/" },
  ],
} as const;

export const whatsappLink = (text = "Hi Fortius, I would like to book a consultation.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const nav = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Our Doctors", href: "/doctors" },
      { label: "Awards", href: "/awards" },
    ],
  },
  { label: "Treatments", href: "/treatments", mega: true },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: site.blogUrl, external: true },
  { label: "Contact", href: "/contact" },
] as const;

export const about = {
  homeIntro: [
    "At Fortius Health Clinic, we are committed to enhancing your well-being with personalized treatments that address sexual health concerns and skin conditions. As a trusted sexologist in Bangalore and a dedicated sexual health clinic in Bangalore, our approach focuses on holistic healing, ensuring every patient receives the highest-quality sexual health treatment in Bangalore, along with herbal solutions tailored to their individual needs.",
    "An eminent Sexual Debility Clinic that gives you one-stop solutions for Sex and Skin Disease.",
  ],
  quote:
    "The unique creation of God and most precious gift we have been bestowed open for life is “The golden opportunity to live and enjoy all in this beautiful planet”.",
  pageTitle: "Crafting Personalized Treatments to Your Problem",
  pageText: [
    "Our objective is to maintain your wonderful health while also fulfilling our obligation to give you the required herbal products. We constantly ensure that customers get value for their money, which is the key factor in our successful growth in domestic and international markets. Renowned sexual debilitation clinic that offers one-stop remedies for sex-related issues and skin conditions. The opportunity to live and appreciate everything in our beautiful world is “the unique creation of God and the most priceless gift we have been gifted with open for life.”",
    "Unfortunately, some people experience agony and suffering as a result of sex issues as a result of this so-called gift. The overwhelming feedback we’ve received from patients in India and abroad speaks volumes about our recent success.",
  ],
};

export const stats = [
  { value: 10, suffix: "+", label: "Countries" },
  { value: 10, suffix: "K+", label: "Patients" },
  { value: 13, suffix: "+", label: "Years of experience" },
  { value: 99.9, suffix: "%", label: "Success ratio", decimals: 1 },
];

export const doctor = {
  name: "Dr. Mujahid Jameel",
  credentials: "MD(AM) BUMS, DAF, CHEF, PGDYT",
  role: "Founder & Chief Sexologist",
  image: "/images/team/dr-jameel.png",
  awardImage: "/images/team/dr-jameel-award-clean.jpg",
  bio:
    "Dr. M. Jameel (Dr. Mujahid Jammel), holding MD(AM)BUMS, DAF, CHEF, PGDYT, has over 15 years of experience treating male sexual health concerns, including erectile dysfunction, premature ejaculation, male infertility, and other sexual disorders. As an experienced sexologist in Bangalore, he provides personalized care and guidance for patients seeking effective sexual health treatment in Bangalore. His expertise and dedication to patient care have earned national and international recognition. At Fortius Health Clinic, a trusted sexual health clinic in Bangalore, he focuses on patient well-being, compassionate care, and individualized treatment approaches.",
  short:
    "Dr. M. Jameel is one among the most eminent Health Care Service provider in Herbal Space, Bangalore India established in the year of 2009. It carries the legacy of renowned Unani scholar and physician.",
  long:
    "Dr. M. Jameel is a well-known sexologist in Bangalore with over 13 years of experience in Pre-Marital Counseling and Male Sexual Problems like Sex Transmitted Disease, ED, Circumcision and more. He is not only serving our country people, he marked his name in Middle East Countries too. He has been fortunate to make his presence felt all around the world and have been honored with National and International awards. His wish to see all his patients and the family to be happy and satisfied.",
};

export const accolade = {
  eyebrow: "Accolades",
  title: "Most Trusted Sexologist of the Year",
  text: "Dr. Mujahid Jameel, the esteemed founder and chief sexologist at Fortius Health Clinic, has been honored with the prestigious “Most Trusted Sexologist of the year” award by IBARC Asia International. Additionally, he has been recognized as the “Best Sexologist” by Asia Today. Dr. Jameel’s dedication to his field and his commitment to patient care have earned Fortius the name of best sexologist hospital in Bangalore and these esteemed accolades.",
  videos: [
    { title: "World Signature Awards", poster: "/images/banners/youtube-video.webp", src: `${CDN}/img/video/award1.mp4` },
    { title: "Pride of Nation Awards — Asia Today", poster: "/images/banners/award2.webp", src: `${CDN}/img/video/award2.mp4` },
  ],
};

export const patientServices = {
  eyebrow: "Patient services",
  title: "Personal & Individual Medical Services",
  text: "Crafting personalized & advanced medical practices and treatment to deliver permanent solutions.",
  footnote:
    "Fortius health clinic has Qualified Doctors for your service always, in order to make your process success. We guarantee 100% satisfaction with our treatment process for sure.",
  items: [
    { icon: "ShieldCheck", title: "Data Security & Confidentiality" },
    { icon: "HeartPulse", title: "10x Safety" },
    { icon: "Microscope", title: "Latest Equipment & Technology" },
    { icon: "BadgeCheck", title: "Quality" },
    { icon: "Leaf", title: "Organic Treatments" },
  ],
} as const;

export const conditionsShowcase = {
  eyebrow: "Conditions and treatments",
  text: "Our unique consultation strategy and approach towards healing of a problem with the latest equipment and technologies tailored for each treatment makes us the best sexologist hospital in Bangalore.",
  items: [
    {
      title: "Erectile Dysfunction",
      slug: "erectile-dysfunction",
      image: "/images/conditions/erectile-dysfunction.jpg",
      options: ["Oral Drug", "Testosterone Therapy", "Penile Injections", "Intraurethral Medication", "Vacuum Erection Devices", "Penile Implants"],
    },
    {
      title: "Low Sperm Count",
      slug: "sperm-count",
      image: "/images/conditions/low-sperm-count.jpg",
      options: ["IVF with ICSI", "Hormonal Treatment", "Antibiotic Treatment", "Artificial Donor Sperm Insemination", "Assisted Reproductive Technology", "Surgery"],
    },
    {
      title: "Premature Ejaculation",
      slug: "premature-ejaculation",
      image: "/images/conditions/premature-ejaculation.jpg",
      options: ["Shockwave Therapy", "Sex Therapy", "Injection Therapy", "Penile Frenulectomy"],
    },
    {
      title: "Couples Problem",
      slug: "couple-problems",
      image: "/images/conditions/couples-problem.jpg",
      options: ["Relationship Counselling", "Stress Management", "Guided Stimulation", "Mindfulness"],
    },
  ],
};

export const team = [
  { name: "Dr. Mujahid Jameel", role: "Infertility Specialist", image: "/images/team/dr-jameel.png" },
  // NOTE: these two profiles use a placeholder avatar on the current site — confirm before launch.
  { name: "Dr. Jaylon Dias", role: "Infertility Specialist", image: null },
  { name: "Dr. Rhiel Madsen", role: "Infertility Specialist", image: null },
];

export type Testimonial = { name: string; place?: string; quote: string; tag?: string };

export const testimonials: Testimonial[] = [
  { name: "Atharva Meher", tag: "ED treatment", quote: "I visited Dr. Jameel for ED treatment. Their clinic’s data security, advanced treatment methods and strong focus on quality care makes them stand as the best sexologist hospital in Bangalore." },
  { name: "Ganaesh Kajare", tag: "Fertility", quote: "IVF, ICSI, ERA, and other top-notch professional services are offered to patients at this facility. Chief doctor is a compassionate and intelligent individual. The staff members are friendly and helpful. Every employee in this facility is proficient in using English to interact with patients. Highly suggested." },
  { name: "Syed Shoaib", quote: "Dr Jameel is a wonderful personality, very warm in his interactions, gives complete clarity and confidence to his patients. I took my uncle after I got some recommendations. Very good treatment, truly an inspiring person. I strongly recommend Dr. Jameel." },
  { name: "Ashok Kumar", tag: "ED treatment", quote: "I am 46 yrs old, the doctors here are quite well expertise. One of the best ED treatments in Bangalore, would highly recommend this place. It matters when it affects a person’s manhood. I did face many problems but now feeling much better and I believe it will be fine. Thank you for the help with your counselling, medication and treatment, Dr Jameel." },
  { name: "Mr. Rakesh", tag: "Fertility", quote: "Thank you for making my life happier than ever. Now I have a baby and my wife is very happy. Thanks to Dr. Mujahid Jameel and Fortius Health Centre for taking care of us throughout the treatment and giving rebirth to us. Highly recommended clinic!" },
  { name: "Mr. Aazim", place: "Bahrain", quote: "Staff are helpful, sweet, and gentle, and this goes a long way in creating this a positive experience. Dr. Mujahid Jameel is very kind and careful in his approach. He is so supportive and free to all queries, which really helps to reduce my nervousness." },
  { name: "Mr. Tahir", place: "Dubai", tag: "Fertility", quote: "Very happy with Fortius health center, I always felt I was in trustworthy hands. Dr. Mujahid Jameel is a kind and generous person. My daughter is now 11 months old, and she is my world! Every day I feel happy, a big thank you to all the staff at Fortius." },
  { name: "Bisha Singh", quote: "There were no side effects and the treatment was affordable. I had wasted much more on pills bought from the internet. It did take more than 3 months to fully recover. They are the best doctors in this city." },
  { name: "Subash Ram", quote: "The doctors really guided me well with the medicines and also how to tackle it naturally with meditation and exercises and lifestyle improvement." },
  { name: "Gairv Divaker", quote: "I am feeling so relieved. By meeting with the doctors of this clinic they are the best in this city with very good doctors." },
  { name: "Anu Ji", quote: "He was very confident about his approach and that gave me confidence that I was with the right person. I have seen good results." },
  { name: "Mr. Venkatesh", place: "Bangalore", tag: "Fertility", quote: "All we wanted is a baby to fulfill our life. After searching for many clinics, we found Fortius health. A miracle happened soon, and I became a father. Thanks to Dr. Mujahid Jameel and his team for solving all our struggles." },
  { name: "Mr. Suhail", place: "Mumbai", tag: "Fertility", quote: "I had wonderful treatment and experience at Fortius health. Struggled for almost about 5 years without a baby. Now no words to say about my feelings after becoming a father. Thanks to Dr. Mujahid Jameel and his staff who really looked after me and felt like a family." },
];

export const videoTestimonials: Testimonial[] = [
  { name: "Mr. Sulaiman Siddiqi", place: "Dubai, UAE", quote: "I am very grateful for the medical care I received at this medical center around the lump I discovered on my problem. Soon after the test and the results I wanted to consult Dr. Jameel and his team helped me to trust and compassion. They are making us happy and satisfied." },
  { name: "Mr. Abdul Rahman", place: "Egypt", quote: "I just wanted to share with everyone that we’ve gotten some incredibly positive quality service to us from them. Really incredible medical treatment service provided! I really like the way they approach me, with great medical skills & info etc. It keeps me fresh & alive. Thank you again!" },
];

export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  { q: "Is Fortius the best sexologist hospital in Bangalore?", a: "Yes, Fortius is one of the best sexologist hospital in Bangalore with highly experienced chief sexologist Dr. Mujahid Jameel and other specialized doctors for each sexual health related treatments with the advanced technologies and safety." },
  { q: "Is it OK to consult a sexologist?", a: "Yes, you can consult with a sexologist if you are facing any sexual problems. Sexologists are therapists, who specialize in solving your sexual problems using advanced treatments and therapies." },
  { q: "Who is better, an urologist or a sexologist?", a: "Both are better depending on your health concerns. Urologist focuses on physical conditions like a problem on urinary tract or problems on male reproductive system and Sexologist focuses on broader sexual health, relationship issues & psychological factors that affect sexual health." },
  { q: "What is a male private part doctor called?", a: "Male private part doctors are called as urologist, sexologist, Andrologist and Gynecologist. These all specialized doctors can treat male private parts depending on the specialization." },
];

export const aboutFaqs: Faq[] = [
  { q: "How to find the Best Male sexologist in Bangalore?", a: "You can find the best male sexologist in Bangalore on knowing the experience of the doctor and the treatments they are specialized for. Approach the male sexologist only if they are specialized in treating the sexual problem you are facing." },
  { q: "When should a man consult a sexologist?", a: "A man should consult a sexologist when his sexual problems make him feel psychologically affected and also when his problems affect the sexual life of his partner. Example - low sex drive, Erectile dysfunction, Feeling guilty etc." },
  { q: "What does a sexologist doctor do?", a: "Sexologist doctors are specialized in identifying and solving problems that affect your sexual life physically and emotionally. They may provide the necessary treatment for your problems by providing counseling, therapies, consultation and surgeries." },
  { q: "Is Dr. Jameel the best sexologist in Bangalore?", a: "Yes, Dr. Jameel is one of the best sexologists in Bangalore with more than a decade of experience in treating male sexual health problems like STD, ED, Azoospermia, Male infertility and other infertile treatments. He is well known in India and middle east countries and also being awarded with national and international awards recognize him as the best sexologist in Bangalore." },
];

export const gallery = [
  { src: "/images/gallery/exterior-2.jpg", alt: "Fortius Health Clinic building at dusk", cat: "Exterior" },
  { src: "/images/gallery/interior-2.jpg", alt: "Patient lounge with sky ceiling", cat: "Interior" },
  { src: "/images/gallery/exterior-1.jpg", alt: "Fortius Health Clinic street view", cat: "Exterior" },
  { src: "/images/gallery/interior-1.jpg", alt: "Waiting area and pharmacy", cat: "Interior" },
  { src: "/images/gallery/interior-3.jpg", alt: "Clinic corridor", cat: "Interior" },
  { src: "/images/gallery/exterior-4.jpg", alt: "Clinic at night", cat: "Exterior" },
  { src: "/images/gallery/interior-4.jpg", alt: "Private waiting lounge", cat: "Interior" },
  { src: "/images/gallery/exterior-3.jpg", alt: "Clinic front elevation", cat: "Exterior" },
  { src: "/images/gallery/exterior-6.jpg", alt: "Clinic entrance in the evening", cat: "Exterior" },
  { src: "/images/gallery/interior-7.jpg", alt: "Consultation desk", cat: "Interior" },
  { src: "/images/gallery/exterior-5.jpg", alt: "Fortius building facade", cat: "Exterior" },
  { src: "/images/gallery/exterior-7.jpg", alt: "Corner view of the clinic", cat: "Exterior" },
  { src: "/images/certificates/iace.png", alt: "IACE certificate", cat: "Awards" },
  { src: "/images/certificates/sexology.png", alt: "Sexology certificate", cat: "Awards" },
  { src: "/images/certificates/sexology2.png", alt: "Sexology certificate", cat: "Awards" },
  { src: "/images/certificates/unani.png", alt: "Unani certificate", cat: "Awards" },
  { src: "/images/certificates/ics.png", alt: "ICS certificate", cat: "Awards" },
  { src: "/images/certificates/iantl.png", alt: "IANTL certificate", cat: "Awards" },
] as const;

export const certificates = gallery.filter((g) => g.cat === "Awards");
