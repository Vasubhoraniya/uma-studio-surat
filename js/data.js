// ============================================================
// Uma Photo Studio — Application Data
// All data constants mapped to a flat, simple local folder 'images/'
// ============================================================

window.APP_DATA = {
  studio: {
    name: 'Uma Photo Studio',
    tagline: 'EVERY STORY NEED A PICTURE.....',
    // 💡 LOGO TIP: Put your logo in the images folder and write 'images/logo.png' (or whatever filename it has!)
    logo: 'UMA PHOTO STUDIO ', 
    phone: '+91 9879510130',
    email: 'umastudiosuart@gmail.com',
    address: '9,10 - Shree Hari Shopping Center, Opp. Swastik Plaza, Yogi Chowk, Surat, Gujarat - 395010',
    // 💡 SOCIAL LINKS: Replace the '#' with your actual page links (e.g. 'https://instagram.com/myprofile')
    social: {
      instagram1: 'https://www.instagram.com/umawedding/',
      instagram2: 'https://www.instagram.com/uma_childphoto',
      facebook: 'https://www.facebook.com/bhoraniyaprakash',
      youtube: 'https://www.youtube.com/@umaphotostudio8052',
      whatsapp: 'https://wa.me/9979423322' // Swapped Pinterest for WhatsApp! (e.g. 'https://wa.me/911234567890')
    }
  },
  
  team: [
    {
      name: 'Prakash Bhoraniya',
      phone: '+91 9879510130',
      photo: 'images/pbhoraniya.png', // Drop photo into 'images/' named 'team-mnp.jpg'
      bio: 'With over 10 years of experience capturing life\'s most precious moments, MNP brings artistic vision and technical mastery to every shoot.'
    },
    {
      name: 'Jignesh Bhoraniya',
      phone: '+91 9979423322',
      photo: 'images/uma.jpg', // Drop photo into 'images/' named 'team-xyz.jpg'
      bio: 'XYZ specializes in cinematic wedding films and creative outdoor photography, turning every event into a visual masterpiece.'
    }
  ],

  testimonials: [
    // {
    //   text: 'Uma Photo Studio captured our wedding beautifully. Every photo tells a story. We couldn\'t be happier with the results!',
    //   client: 'Priya & Rahul',
    //   event: 'Wedding Photography'
    // },
    // {
    //   text: 'The pre-wedding shoot was magical. They found the most stunning locations and made us feel so comfortable.',
    //   client: 'Neha & Amit',
    //   event: 'Pre-Wedding Shoot'
    // },
    // {
    //   text: 'Our baby\'s first photoshoot was handled with such care and patience. The photos are absolutely adorable!',
    //   client: 'Meera Shah',
    //   event: 'Baby Photoshoot'
    // },
    // {
    //   text: 'Professional, creative, and incredibly talented. The engagement photos exceeded all our expectations.',
    //   client: 'Anjali & Vikram',
    //   event: 'Engagement Photography'
    // },
    // {
    //   text: 'The maternity shoot was a wonderful experience. They made me feel beautiful and the photos are stunning.',
    //   client: 'Ritu Patel',
    //   event: 'Maternity Shoot'
    // }
  ],

  stats: [
    { number: '500+', label: 'Happy Clients' },
    { number: '500+', label: 'Successful Events' },
    { number: '20+', label: 'Years Experience' },
    { number: '1000+', label: 'Photo Albums' }
  ],

  services: [
    {  title: 'Born Baby Photography', cover: 'images/0 COVER/Born Baby Photography01.jpg', desc: 'Professional studio photography for adorable newborn babies.' },
    {  title: 'Wedding Photography', cover: 'images/0 COVER/6/Wedding Photography.jpg', desc: 'Capturing every precious moment of your special day with artistic elegance.' },
    {  title: 'Pre-Wedding', cover: 'images/0 COVER/6/Pre-Wedding_service.jpg', desc: 'Creative pre-wedding shoots at stunning locations of your choice.' },
    {  title: 'Baby & Kids', cover: 'images/0 COVER/Baby & Kids01.jpg', desc: 'Adorable portraits capturing the innocence and joy of little ones.' },
    {  title: 'Maternity Shoots', cover: 'images/0 COVER/6/Maternity Shoots_service.jpg', desc: 'Celebrating the beautiful journey of motherhood with elegant portraits.' },
    {  title: 'Wedding Films', cover: 'images/0 COVER/Wedding Films.jpg', desc: 'Cinematic wedding films that tell your love story beautifully.' },
  ],

  films: [
    {
      title: 'A Royal Wedding Film',
      description: 'A cinematic wedding story captured at a heritage palace.',
      youtubeId: 'dQw4w9WgXcQ',
      category: 'Wedding'
    },
    {
      title: 'Love in the Mountains',
      description: 'A pre-wedding film shot in the misty mountains.',
      youtubeId: 'dQw4w9WgXcQ',
      category: 'Pre-Wedding'
    },
    {
      title: 'Together Forever',
      description: 'A beautiful engagement ceremony film.',
      youtubeId: 'dQw4w9WgXcQ',
      category: 'Engagement'
    },
    {
      title: 'The Grand Celebration',
      description: 'A vibrant Indian wedding celebration.',
      youtubeId: 'dQw4w9WgXcQ',
      category: 'Wedding'
    }
  ]
};

// ============================================================
// Categories — main navigation sections
// ============================================================

window.CATEGORIES = {
  studio: {
    id: 'studio',
    name: 'Studio',
    description: 'Professional indoor studio photography',
    banner: 'images/0 COVER/Born Baby Photography.jpg',
    subcategories: [
      { id: 'portrait', name: 'Born Baby Photography', cover: 'images/STUDIO/BORN BABY/06.jpg', description: 'Adorable and classic newborn baby photography' },
      // { id: 'product', name: 'Product Photography', cover: 'images/cover-product.jpg', description: 'Professional product and commercial shoots' },
      { id: 'fashion', name: 'Toddler Photography', cover: 'images/0 COVER/Toddler Photography.jpg', description: 'Playful and creative toddler and kids sessions' },
      { id: 'family', name: 'Family Photography', cover: 'images/STUDIO/FAMILY/19.jpg', description: 'Beautiful and heartwarming family photography' }
    ]
  },
  outdoor: {
    id: 'outdoor',
    name: 'Outdoor',
    description: 'Stunning outdoor photography at beautiful locations',
    banner: 'images/0 COVER/1WEDDINGCOVER.jpg',
    subcategories: [
      { id: 'wedding', name: 'Wedding', cover: 'images/0 COVER/Wedding.jpg', description: 'Complete wedding day coverage' },
      { id: 'pre-wedding', name: 'Pre-Wedding', cover: 'images/0 COVER/pre-wedding.jpg', description: 'Creative pre-wedding photoshoots' },
      { id: 'engagement', name: 'Engagement', cover: 'images/0 COVER/Engagement.jpg', description: 'Beautiful engagement ceremony shoots' },
      { id: 'baby', name: 'Child Photoshoot', cover: 'images/WED/BABYOUTDOOR/9.jpg', description: 'Adorable newborn and child photography' },
      { id: 'maternity', name: 'Maternity Shoot', cover: 'images/0 COVER/5/Maternity Shoot.jpg', description: 'Elegant maternity photography' }
    ]
  }
};

// ============================================================
// Albums — each subcategory has multiple albums with photos
// ============================================================

window.ALBUMS = {
  // ── Studio subcategories ──────────────────────────────────
  portrait: [
    {
      id: 'portrait-classic',
      title: 'Baby Blossom Clicks',
      cover: 'images/STUDIO/BORN BABY/06.jpg',
      date: '2024',
      description: 'A timeless portrait collection',
      photos: [
        'images/STUDIO/BORN BABY/01.jpg',
        'images/STUDIO/BORN BABY/02.jpg',
        'images/STUDIO/BORN BABY/03.jpg',
        'images/STUDIO/BORN BABY/04.jpg',
        'images/STUDIO/BORN BABY/05.jpg',
        'images/STUDIO/BORN BABY/07.jpg',
        'images/STUDIO/BORN BABY/08.jpg',
        'images/STUDIO/BORN BABY/09.jpg',
        'images/STUDIO/BORN BABY/10.jpg',
        'images/STUDIO/BORN BABY/12.jpg',
        'images/STUDIO/BORN BABY/13.jpg',
        'images/STUDIO/BORN BABY/14.jpg',
        'images/STUDIO/BORN BABY/15.jpg',
        'images/STUDIO/BORN BABY/16.jpg',
        'images/STUDIO/BORN BABY/17.jpg',
        'images/STUDIO/BORN BABY/18.jpg',
        'images/STUDIO/BORN BABY/19.jpg',
        'images/STUDIO/BORN BABY/20.jpg',
        'images/STUDIO/BORN BABY/21.jpg',
        'images/STUDIO/BORN BABY/22.jpg',
        'images/STUDIO/BORN BABY/23.jpg',
        'images/STUDIO/BORN BABY/24.jpg',
        'images/STUDIO/BORN BABY/25.jpg',
        'images/STUDIO/BORN BABY/26.jpg',
        'images/STUDIO/BORN BABY/27.jpg'

      ]
    }
  ],

  fashion: [
    {
      id: 'fashion-editorial',
      title: 'Golden Childhood Clicks',
      cover: 'images/0 COVER/Toddler Photography.jpg',
      date: '2024',
      description: 'High-fashion editorial shoot',
      photos: [
        'images/STUDIO/Todler/01.jpg',
        'images/STUDIO/Todler/02.jpg',
        'images/STUDIO/Todler/03.jpg',
        'images/STUDIO/Todler/04.jpg',
        'images/STUDIO/Todler/05.jpg',
        'images/STUDIO/Todler/06.jpg',
        'images/STUDIO/Todler/07.jpg',
        'images/STUDIO/Todler/08.jpg',
        'images/STUDIO/Todler/09.jpg',
        'images/STUDIO/Todler/10.jpg',
        'images/STUDIO/Todler/11.jpg',
        'images/STUDIO/Todler/12.jpg',
        'images/STUDIO/Todler/13.jpg',
        'images/STUDIO/Todler/14.jpg',
        'images/STUDIO/Todler/15.jpg',
        'images/STUDIO/Todler/16.jpg',
        'images/STUDIO/Todler/17.jpg',
        'images/STUDIO/Todler/18.jpg',
        'images/STUDIO/Todler/19.jpg',
        'images/STUDIO/Todler/20.jpg',
        'images/STUDIO/Todler/21.jpg',
        'images/STUDIO/Todler/22.jpg',
        'images/STUDIO/Todler/23.jpg',
        'images/STUDIO/Todler/24.jpg',
        'images/STUDIO/Todler/25.jpg',
        'images/STUDIO/Todler/26.jpg',
        'images/STUDIO/Todler/28.jpg',
        'images/STUDIO/Todler/29.jpg',
        'images/STUDIO/Todler/30.jpg',
        'images/STUDIO/Todler/31.jpg',
        'images/STUDIO/Todler/32.jpg',
        'images/STUDIO/Todler/33.jpg',
        'images/STUDIO/Todler/34.jpg',
        'images/STUDIO/Todler/35.jpg',
        'images/STUDIO/Todler/36.jpg'
      ]
    }
  ],

  family: [
    {
      id: 'family-joy',
      title: 'Family Joy',
      cover: 'images/STUDIO/FAMILY/28.jpg',
      date: '2024',
      description: 'Heartwarming family portrait session',
      photos: [
        'images/STUDIO/FAMILY/01.jpg',
        'images/STUDIO/FAMILY/02.jpg',
        'images/STUDIO/FAMILY/03.jpg',
        'images/STUDIO/FAMILY/04.jpg',
        'images/STUDIO/FAMILY/05.jpg',
        'images/STUDIO/FAMILY/06.jpg',
        'images/STUDIO/FAMILY/07.jpg',
        'images/STUDIO/FAMILY/08.jpg',
        'images/STUDIO/FAMILY/09.jpg',
        'images/STUDIO/FAMILY/10.jpg',
        'images/STUDIO/FAMILY/11.jpg',
        'images/STUDIO/FAMILY/12.jpg',
        'images/STUDIO/FAMILY/13.jpg',
        'images/STUDIO/FAMILY/14.jpg',
        'images/STUDIO/FAMILY/15.jpg',
        'images/STUDIO/FAMILY/16.jpg',
        'images/STUDIO/FAMILY/17.jpg',
        'images/STUDIO/FAMILY/18.jpg',
        'images/STUDIO/FAMILY/20.jpg',
        'images/STUDIO/FAMILY/21.jpg',
        'images/STUDIO/FAMILY/22.jpg',
        'images/STUDIO/FAMILY/23.jpg',
        'images/STUDIO/FAMILY/24.jpg',
        'images/STUDIO/FAMILY/25.jpg',
        'images/STUDIO/FAMILY/26.jpg',
        'images/STUDIO/FAMILY/27.jpg',
        'images/STUDIO/FAMILY/28.jpg',
        'images/STUDIO/FAMILY/29.jpg',
        'images/STUDIO/FAMILY/30.jpg',
        'images/STUDIO/FAMILY/31.jpg',
        'images/STUDIO/FAMILY/32.jpg',
        'images/STUDIO/FAMILY/33.jpg',
        'images/STUDIO/FAMILY/34.jpg',
        'images/STUDIO/FAMILY/35.jpg'
      ]
    }
  ],

  // ── Outdoor subcategories ─────────────────────────────────
  wedding: [
    {
      id: 'wedding-p&k',
      title: 'PARTH & KRIPAL',
      cover: 'images/WED/WEDD/Parth & Kripal/29.jpg',
      date: '2024',
      description: 'A grand palace wedding celebration',
      photos: [
        'images/WED/WEDD/Parth & Kripal/01.jpg',
        'images/WED/WEDD/Parth & Kripal/02.jpg',
        'images/WED/WEDD/Parth & Kripal/03.jpg',
        'images/WED/WEDD/Parth & Kripal/04.jpg',
        'images/WED/WEDD/Parth & Kripal/05.jpg',
        'images/WED/WEDD/Parth & Kripal/06.jpg',
        'images/WED/WEDD/Parth & Kripal/07.jpg',
        'images/WED/WEDD/Parth & Kripal/08.jpg',
        'images/WED/WEDD/Parth & Kripal/09.jpg',
        'images/WED/WEDD/Parth & Kripal/10.jpg',
        'images/WED/WEDD/Parth & Kripal/11.jpg',
        'images/WED/WEDD/Parth & Kripal/12.jpg',
        'images/WED/WEDD/Parth & Kripal/13.jpg',
        'images/WED/WEDD/Parth & Kripal/14.jpg',
        'images/WED/WEDD/Parth & Kripal/15.jpg',
        'images/WED/WEDD/Parth & Kripal/16.jpg',
        'images/WED/WEDD/Parth & Kripal/18.jpg',
        'images/WED/WEDD/Parth & Kripal/19.jpg',
        'images/WED/WEDD/Parth & Kripal/20.jpg',
        'images/WED/WEDD/Parth & Kripal/21.jpg',
        'images/WED/WEDD/Parth & Kripal/22.jpg',
        'images/WED/WEDD/Parth & Kripal/23.jpg',
        'images/WED/WEDD/Parth & Kripal/24.jpg',
        'images/WED/WEDD/Parth & Kripal/25.jpg',
        'images/WED/WEDD/Parth & Kripal/26.jpg',
        'images/WED/WEDD/Parth & Kripal/27.jpg',
        'images/WED/WEDD/Parth & Kripal/28.jpg'
      ]
    },
    {
      id: 'wedding-garden',
      title: 'DISHANT & SHIVANI',
      cover: 'images/WED/WEDD/DISHANT & SHIVANI/0 (49).jpg',
      date: '2024',
      description: 'An intimate garden wedding',
      photos: [
        'images/WED/WEDD/DISHANT & SHIVANI/0 (1).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (2).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (3).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (4).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (5).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (6).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (7).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (8).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (9).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (10).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (11).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (12).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (13).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (14).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (15).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (16).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (17).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (18).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (19).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (20).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (21).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (22).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (23).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (24).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (25).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (26).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (27).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (28).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (29).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (30).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (31).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (32).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (33).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (34).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (35).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (36).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (37).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (38).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (39).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (40).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (41).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (42).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (43).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (44).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (45).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (46).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (47).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (48).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (50).jpg',
        'images/WED/WEDD/DISHANT & SHIVANI/0 (51).jpg'
      ]
    },
    {
      id: 'wedding-traditional',
      title: 'JALDIP &  GOPI',
      cover: 'images/WED/WEDD/JALDIP &  GOPI/15.jpg',
      date: '2023',
      description: 'A beautiful traditional Indian wedding',
      photos: [
        'images/WED/WEDD/JALDIP &  GOPI/01.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/02.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/03.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/04.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/05.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/06.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/07.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/08.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/09.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/10.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/11.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/12.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/13.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/14.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/16.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/17.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/18.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/19.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/20.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/21.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/22.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/23.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/24.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/25.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/26.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/27.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/28.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/29.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/30.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/31.jpg',
        'images/WED/WEDD/JALDIP &  GOPI/32.jpg',
      ]
    },
    {
      id: 'wedding-traditional0001',
      title: 'JAY & GRISHMA',
      cover: 'images/WED/WEDD/JAY & GRISHMA/31.jpg',
      date: '2023',
      description: 'A beautiful traditional Indian wedding',
      photos: [
        'images/WED/WEDD/JAY & GRISHMA/01.jpg',
        'images/WED/WEDD/JAY & GRISHMA/02.jpg',
        'images/WED/WEDD/JAY & GRISHMA/03.jpg',
        'images/WED/WEDD/JAY & GRISHMA/04.jpg',
        'images/WED/WEDD/JAY & GRISHMA/05.jpg',
        'images/WED/WEDD/JAY & GRISHMA/06.jpg',
        'images/WED/WEDD/JAY & GRISHMA/07.jpg',
        'images/WED/WEDD/JAY & GRISHMA/08.jpg',
        'images/WED/WEDD/JAY & GRISHMA/09.jpg',
        'images/WED/WEDD/JAY & GRISHMA/10.jpg',
        'images/WED/WEDD/JAY & GRISHMA/11.jpg',
        'images/WED/WEDD/JAY & GRISHMA/12.jpg',
        'images/WED/WEDD/JAY & GRISHMA/13.jpg',
        'images/WED/WEDD/JAY & GRISHMA/14.jpg',
        'images/WED/WEDD/JAY & GRISHMA/16.jpg',
        'images/WED/WEDD/JAY & GRISHMA/17.jpg',
        'images/WED/WEDD/JAY & GRISHMA/18.jpg',
        'images/WED/WEDD/JAY & GRISHMA/19.jpg',
        'images/WED/WEDD/JAY & GRISHMA/20.jpg',
        'images/WED/WEDD/JAY & GRISHMA/21.jpg',
        'images/WED/WEDD/JAY & GRISHMA/22.jpg',
        'images/WED/WEDD/JAY & GRISHMA/23.jpg',
        'images/WED/WEDD/JAY & GRISHMA/24.jpg',
        'images/WED/WEDD/JAY & GRISHMA/25.jpg',
        'images/WED/WEDD/JAY & GRISHMA/26.jpg',
        'images/WED/WEDD/JAY & GRISHMA/27.jpg',
        'images/WED/WEDD/JAY & GRISHMA/28.jpg',
        'images/WED/WEDD/JAY & GRISHMA/29.jpg',
        'images/WED/WEDD/JAY & GRISHMA/30.jpg',
        'images/WED/WEDD/JAY & GRISHMA/31.jpg',
        'images/WED/WEDD/JAY & GRISHMA/32.jpg',
      ]
    },
    {
      id: 'wedding-traditional0002',
      title: 'ROMIK & ISHA',
      cover: 'images/WED/WEDD/ROMIK & ISHA/13.jpg',
      date: '2023',
      description: 'A beautiful traditional Indian wedding',
      photos: [
        'images/WED/WEDD/ROMIK & ISHA/01.jpg',
        'images/WED/WEDD/ROMIK & ISHA/02.jpg',
        'images/WED/WEDD/ROMIK & ISHA/03.jpg',
        'images/WED/WEDD/ROMIK & ISHA/04.jpg',
        'images/WED/WEDD/ROMIK & ISHA/05.jpg',
        'images/WED/WEDD/ROMIK & ISHA/06.jpg',
        'images/WED/WEDD/ROMIK & ISHA/07.jpg',
        'images/WED/WEDD/ROMIK & ISHA/08.jpg',
        'images/WED/WEDD/ROMIK & ISHA/09.jpg',
        'images/WED/WEDD/ROMIK & ISHA/10.jpg',
        'images/WED/WEDD/ROMIK & ISHA/11.jpg',
        'images/WED/WEDD/ROMIK & ISHA/12.jpg',
        'images/WED/WEDD/ROMIK & ISHA/13.jpg',
        'images/WED/WEDD/ROMIK & ISHA/14.jpg',
        'images/WED/WEDD/ROMIK & ISHA/17.jpg',
        'images/WED/WEDD/ROMIK & ISHA/18.jpg',
        'images/WED/WEDD/ROMIK & ISHA/19.jpg',
        'images/WED/WEDD/ROMIK & ISHA/20.jpg',
        'images/WED/WEDD/ROMIK & ISHA/21.jpg',
        'images/WED/WEDD/ROMIK & ISHA/22.jpg',
        'images/WED/WEDD/ROMIK & ISHA/24.jpg',
        'images/WED/WEDD/ROMIK & ISHA/25.jpg',
        'images/WED/WEDD/ROMIK & ISHA/26.jpg',
        'images/WED/WEDD/ROMIK & ISHA/27.jpg'
        
      ]
    }
  ],

  engagement: [
    {
      id: 'engagement-golden',
      title: 'ISHAN & SHITAL',
      cover: 'images/WED/ENG/Ishan & Shital/21.jpg',
      date: '2024',
      description: 'A sparkling engagement ceremony',
      photos: [
        'images/WED/ENG/Ishan & Shital/0.jpg',
        'images/WED/ENG/Ishan & Shital/1.jpg',
        'images/WED/ENG/Ishan & Shital/2.jpg',
        'images/WED/ENG/Ishan & Shital/3.jpg',
        'images/WED/ENG/Ishan & Shital/4.jpg',
        'images/WED/ENG/Ishan & Shital/5.jpg',
        'images/WED/ENG/Ishan & Shital/6.jpg',
        'images/WED/ENG/Ishan & Shital/7.jpg',
        'images/WED/ENG/Ishan & Shital/8.jpg',
        'images/WED/ENG/Ishan & Shital/9.jpg',
        'images/WED/ENG/Ishan & Shital/10.jpg',
        'images/WED/ENG/Ishan & Shital/11.jpg',
        'images/WED/ENG/Ishan & Shital/12.jpg',
        'images/WED/ENG/Ishan & Shital/13.jpg',
        'images/WED/ENG/Ishan & Shital/14.jpg',
        'images/WED/ENG/Ishan & Shital/15.jpg',
        'images/WED/ENG/Ishan & Shital/16.jpg',
        'images/WED/ENG/Ishan & Shital/17.jpg',
        'images/WED/ENG/Ishan & Shital/18.jpg',
        'images/WED/ENG/Ishan & Shital/19.jpg',
        'images/WED/ENG/Ishan & Shital/20.jpg',
        'images/WED/ENG/Ishan & Shital/22.jpg',
        'images/WED/ENG/Ishan & Shital/23.jpg',
        'images/WED/ENG/Ishan & Shital/24.jpg',
        'images/WED/ENG/Ishan & Shital/25.jpg',
        'images/WED/ENG/Ishan & Shital/26.jpg',
        'images/WED/ENG/Ishan & Shital/27.jpg',
        'images/WED/ENG/Ishan & Shital/28.jpg',
        'images/WED/ENG/Ishan & Shital/29.jpg',
        'images/WED/ENG/Ishan & Shital/30.jpg',
        'images/WED/ENG/Ishan & Shital/31.jpg',
        'images/WED/ENG/Ishan & Shital/32.jpg',
        'images/WED/ENG/Ishan & Shital/33.jpg'
      ]
    },
    {
      id: 'engagement-golden2',
      title: 'OM & SURBHI',
      cover: 'images/WED/ENG/Om & Surbhi/33.jpg',
      date: '2024',
      description: 'A sparkling engagement ceremony',
      photos: [
        'images/WED/ENG/Om & Surbhi/01.jpg',
        'images/WED/ENG/Om & Surbhi/02.jpg',
        'images/WED/ENG/Om & Surbhi/03.jpg',
        'images/WED/ENG/Om & Surbhi/04.jpg',
        'images/WED/ENG/Om & Surbhi/05.jpg',
        'images/WED/ENG/Om & Surbhi/06.jpg',
        'images/WED/ENG/Om & Surbhi/07.jpg',
        'images/WED/ENG/Om & Surbhi/08.jpg',
        'images/WED/ENG/Om & Surbhi/09.jpg',
        'images/WED/ENG/Om & Surbhi/10.jpg',
        'images/WED/ENG/Om & Surbhi/11.jpg',
        'images/WED/ENG/Om & Surbhi/12.jpg',
        'images/WED/ENG/Om & Surbhi/13.jpg',
        'images/WED/ENG/Om & Surbhi/14.jpg',
        'images/WED/ENG/Om & Surbhi/15.jpg',
        'images/WED/ENG/Om & Surbhi/16.jpg',
        'images/WED/ENG/Om & Surbhi/17.jpg',
        'images/WED/ENG/Om & Surbhi/18.jpg',
        'images/WED/ENG/Om & Surbhi/19.jpg',
        'images/WED/ENG/Om & Surbhi/20.jpg',
        'images/WED/ENG/Om & Surbhi/22.jpg',
        'images/WED/ENG/Om & Surbhi/23.jpg',
        'images/WED/ENG/Om & Surbhi/24.jpg',
        'images/WED/ENG/Om & Surbhi/25.jpg',
        'images/WED/ENG/Om & Surbhi/26.jpg',
        'images/WED/ENG/Om & Surbhi/27.jpg',
        'images/WED/ENG/Om & Surbhi/28.jpg',
        'images/WED/ENG/Om & Surbhi/29.jpg',
        'images/WED/ENG/Om & Surbhi/30.jpg',
        'images/WED/ENG/Om & Surbhi/31.jpg',
        'images/WED/ENG/Om & Surbhi/32.jpg',
        'images/WED/ENG/Om & Surbhi/34.jpg',
        'images/WED/ENG/Om & Surbhi/35.jpg',
        'images/WED/ENG/Om & Surbhi/36.jpg',
        'images/WED/ENG/Om & Surbhi/37.jpg',
        'images/WED/ENG/Om & Surbhi/38.jpg',
        'images/WED/ENG/Om & Surbhi/39.jpg',
        'images/WED/ENG/Om & Surbhi/40.jpg',
        'images/WED/ENG/Om & Surbhi/41.jpg',
        'images/WED/ENG/Om & Surbhi/42.jpg',
        'images/WED/ENG/Om & Surbhi/43.jpg',
        'images/WED/ENG/Om & Surbhi/44.jpg',
        'images/WED/ENG/Om & Surbhi/45.jpg',
        'images/WED/ENG/Om & Surbhi/46.jpg',
        'images/WED/ENG/Om & Surbhi/47.jpg'
      ]
    }
  ],

  'pre-wedding': [
    {
      id: 'prewedding-mountains',
      title: 'NEVIL & DRASHTI',
      cover: 'images/WED/PRE/03/34.jpg',
      date: '2024',
      description: 'Pre-wedding shoot in the misty mountains',
      photos: [
        'images/WED/PRE/03/01.jpg',
        'images/WED/PRE/03/02.jpg',
        'images/WED/PRE/03/03.jpg',
        'images/WED/PRE/03/04.jpg',
        'images/WED/PRE/03/05.jpg',
        'images/WED/PRE/03/06.jpg',
        'images/WED/PRE/03/07.jpg',
        'images/WED/PRE/03/08.jpg',
        'images/WED/PRE/03/09.jpg',
        'images/WED/PRE/03/10.jpg',
        'images/WED/PRE/03/11.jpg',
        'images/WED/PRE/03/12.jpg',
        'images/WED/PRE/03/13.jpg',
        'images/WED/PRE/03/14.jpg',
        'images/WED/PRE/03/15.jpg',
        'images/WED/PRE/03/16.jpg',
        'images/WED/PRE/03/17.jpg',
        'images/WED/PRE/03/18.jpg',
        'images/WED/PRE/03/19.jpg',
        'images/WED/PRE/03/20.jpg',
        'images/WED/PRE/03/21.jpg',
        'images/WED/PRE/03/22.jpg',
        'images/WED/PRE/03/23.jpg',
        'images/WED/PRE/03/24.jpg',
        'images/WED/PRE/03/25.jpg',
        'images/WED/PRE/03/26.jpg',
        'images/WED/PRE/03/27.jpg',
        'images/WED/PRE/03/28.jpg',
        'images/WED/PRE/03/29.jpg',
        'images/WED/PRE/03/30.jpg',
        'images/WED/PRE/03/31.jpg',
        'images/WED/PRE/03/32.jpg',
        'images/WED/PRE/03/33.jpg',
        'images/WED/PRE/03/35.jpg',
        'images/WED/PRE/03/36.jpg',
        'images/WED/PRE/03/37.jpg',
        'images/WED/PRE/03/38.jpg',
        'images/WED/PRE/03/39.jpg',
        'images/WED/PRE/03/40.jpg',
        'images/WED/PRE/03/41.jpg',
        'images/WED/PRE/03/42.jpg',
        'images/WED/PRE/03/43.jpg',
        'images/WED/PRE/03/44.jpg',
        'images/WED/PRE/03/45.jpg',
        'images/WED/PRE/03/46.jpg',
        'images/WED/PRE/03/47.jpg',
        'images/WED/PRE/03/48.jpg',
        'images/WED/PRE/03/49.jpg',
        'images/WED/PRE/03/50.jpg',
        'images/WED/PRE/03/52.jpg',
        'images/WED/PRE/03/53.jpg',
        'images/WED/PRE/03/54.jpg',
      ]
    },
    {
      id: 'prewedding-beach01',
      title: 'MIHIR & RUDRAKSHI',
      cover: 'images/WED/PRE/05/20.jpg',
      date: '2024',
      description: 'Romantic beach pre-wedding shoot',
      photos: [
        'images/WED/PRE/05/01.jpg',
        'images/WED/PRE/05/02.jpg',
        'images/WED/PRE/05/03.jpg',
        'images/WED/PRE/05/04.jpg',
        'images/WED/PRE/05/05.jpg',
        'images/WED/PRE/05/06.jpg',
        'images/WED/PRE/05/07.jpg',
        'images/WED/PRE/05/08.jpg',
        'images/WED/PRE/05/09.jpg',
        'images/WED/PRE/05/10.jpg',
        'images/WED/PRE/05/11.jpg',
        'images/WED/PRE/05/12.jpg',
        'images/WED/PRE/05/13.jpg',
        'images/WED/PRE/05/14.jpg',
        'images/WED/PRE/05/15.jpg',
        'images/WED/PRE/05/16.jpg',
        'images/WED/PRE/05/17.jpg',
        'images/WED/PRE/05/18.jpg',
        'images/WED/PRE/05/19.jpg',
        'images/WED/PRE/05/21.jpg',
        'images/WED/PRE/05/22.jpg',
        'images/WED/PRE/05/23.jpg',
        'images/WED/PRE/05/24.jpg',
        'images/WED/PRE/05/25.jpg',
        'images/WED/PRE/05/26.jpg',
        'images/WED/PRE/05/27.jpg',
        'images/WED/PRE/05/28.jpg',
        'images/WED/PRE/05/29.jpg',
        'images/WED/PRE/05/30.jpg',
        'images/WED/PRE/05/31.jpg',
        'images/WED/PRE/05/32.jpg',
        'images/WED/PRE/05/33.jpg',
        'images/WED/PRE/05/34.jpg',
        'images/WED/PRE/05/35.jpg',
        'images/WED/PRE/05/36.jpg',
        'images/WED/PRE/05/37.jpg',
        'images/WED/PRE/05/38.jpg',
        'images/WED/PRE/05/39.jpg',
        'images/WED/PRE/05/40.jpg',
        'images/WED/PRE/05/41.jpg',
        'images/WED/PRE/05/42.jpg',
        'images/WED/PRE/05/43.jpg',
        'images/WED/PRE/05/44.jpg',
        'images/WED/PRE/05/45.jpg',
        'images/WED/PRE/05/46.jpg',
        'images/WED/PRE/05/47.jpg',
        'images/WED/PRE/05/48.jpg',
        'images/WED/PRE/05/49.jpg',
        'images/WED/PRE/05/50.jpg',
        'images/WED/PRE/05/51.jpg',
      ]
    },
    {
      id: 'prewedding-beach02',
      title: 'JENIL & KRISHA',
      cover: 'images/WED/PRE/06/39.jpg',
      date: '2024',
      description: 'Romantic beach pre-wedding shoot',
      photos: [
        'images/WED/PRE/06/01.jpg',
        'images/WED/PRE/06/02.jpg',
        'images/WED/PRE/06/03.jpg',
        'images/WED/PRE/06/04.jpg',
        'images/WED/PRE/06/05.jpg',
        'images/WED/PRE/06/06.jpg',
        'images/WED/PRE/06/07.jpg',
        'images/WED/PRE/06/08.jpg',
        'images/WED/PRE/06/09.jpg',
        'images/WED/PRE/06/10.jpg',
        'images/WED/PRE/06/11.jpg',
        'images/WED/PRE/06/12.jpg',
        'images/WED/PRE/06/13.jpg',
        'images/WED/PRE/06/14.jpg',
        'images/WED/PRE/06/15.jpg',
        'images/WED/PRE/06/16.jpg',
        'images/WED/PRE/06/17.jpg',
        'images/WED/PRE/06/18.jpg',
        'images/WED/PRE/06/19.jpg',
        'images/WED/PRE/06/20.jpg',
        'images/WED/PRE/06/21.jpg',
        'images/WED/PRE/06/22.jpg',
        'images/WED/PRE/06/23.jpg',
        'images/WED/PRE/06/24.jpg',
        'images/WED/PRE/06/25.jpg',
        'images/WED/PRE/06/26.jpg',
        'images/WED/PRE/06/27.jpg',
        'images/WED/PRE/06/28.jpg',
        'images/WED/PRE/06/29.jpg',
        'images/WED/PRE/06/30.jpg',
        'images/WED/PRE/06/31.jpg',
        'images/WED/PRE/06/32.jpg',
        'images/WED/PRE/06/33.jpg',
        'images/WED/PRE/06/34.jpg',
        'images/WED/PRE/06/35.jpg',
        'images/WED/PRE/06/36.jpg',
        'images/WED/PRE/06/37.jpg',
        'images/WED/PRE/06/38.jpg',
        'images/WED/PRE/06/39.jpg',
        'images/WED/PRE/06/40.jpg',
        'images/WED/PRE/06/41.jpg',
        'images/WED/PRE/06/42.jpg',
        'images/WED/PRE/06/43.jpg',
        'images/WED/PRE/06/44.jpg',
        'images/WED/PRE/06/45.jpg',
        'images/WED/PRE/06/46.jpg',
        'images/WED/PRE/06/47.jpg',
        'images/WED/PRE/06/48.jpg',
        'images/WED/PRE/06/49.jpg'
      ]
    },
    {
      id: 'prewedding-beach',
      title: 'PARTH & PRINCY',
      cover: 'images/WED/PRE/04/49.jpg',
      date: '2024',
      description: 'Romantic beach pre-wedding shoot',
      photos: [
        'images/WED/PRE/04/01.jpg',
        'images/WED/PRE/04/02.jpg',
        'images/WED/PRE/04/03.jpg',
        'images/WED/PRE/04/04.jpg',
        'images/WED/PRE/04/05.jpg',
        'images/WED/PRE/04/06.jpg',
        'images/WED/PRE/04/07.jpg',
        'images/WED/PRE/04/08.jpg',
        'images/WED/PRE/04/09.jpg',
        'images/WED/PRE/04/10.jpg',
        'images/WED/PRE/04/11.jpg',
        'images/WED/PRE/04/12.jpg',
        'images/WED/PRE/04/13.jpg',
        'images/WED/PRE/04/14.jpg',
        'images/WED/PRE/04/15.jpg',
        'images/WED/PRE/04/16.jpg',
        'images/WED/PRE/04/17.jpg',
        'images/WED/PRE/04/18.jpg',
        'images/WED/PRE/04/19.jpg',
        'images/WED/PRE/04/20.jpg',
        'images/WED/PRE/04/21.jpg',
        'images/WED/PRE/04/22.jpg',
        'images/WED/PRE/04/23.jpg',
        'images/WED/PRE/04/24.jpg',
        'images/WED/PRE/04/25.jpg',
        'images/WED/PRE/04/26.jpg',
        'images/WED/PRE/04/27.jpg',
        'images/WED/PRE/04/28.jpg',
        'images/WED/PRE/04/29.jpg',
        'images/WED/PRE/04/30.jpg',
        'images/WED/PRE/04/31.jpg',
        'images/WED/PRE/04/32.jpg',
        'images/WED/PRE/04/33.jpg',
        'images/WED/PRE/04/34.jpg',
        'images/WED/PRE/04/35.jpg',
        'images/WED/PRE/04/36.jpg',
        'images/WED/PRE/04/37.jpg',
        'images/WED/PRE/04/38.jpg',
        'images/WED/PRE/04/39.jpg',
        'images/WED/PRE/04/40.jpg',
        'images/WED/PRE/04/41.jpg',
        'images/WED/PRE/04/42.jpg',
        'images/WED/PRE/04/43.jpg',
        'images/WED/PRE/04/44.jpg',
        'images/WED/PRE/04/45.jpg',
        'images/WED/PRE/04/46.jpg',
        'images/WED/PRE/04/47.jpg',
        'images/WED/PRE/04/48.jpg',
        'images/WED/PRE/04/50.jpg',
      ]
    },
    {
      id: 'prewedding-beach03',
      title: 'KAUSHIK & DHARA',
      cover: 'images/WED/PRE/02/19.jpg',
      date: '2024',
      description: 'Romantic beach pre-wedding shoot',
      photos: [
        'images/WED/PRE/02/01.jpg',
        'images/WED/PRE/02/02.jpg',
        'images/WED/PRE/02/03.jpg',
        'images/WED/PRE/02/04.jpg',
        'images/WED/PRE/02/05.jpg',
        'images/WED/PRE/02/06.jpg',
        'images/WED/PRE/02/07.jpg',
        'images/WED/PRE/02/08.jpg',
        'images/WED/PRE/02/09.jpg',
        'images/WED/PRE/02/10.jpg',
        'images/WED/PRE/02/11.jpg',
        'images/WED/PRE/02/12.jpg',
        'images/WED/PRE/02/13.jpg',
        'images/WED/PRE/02/14.jpg',
        'images/WED/PRE/02/15.jpg',
        'images/WED/PRE/02/16.jpg',
        'images/WED/PRE/02/17.jpg',
        'images/WED/PRE/02/18.jpg',
        'images/WED/PRE/02/20.jpg',
        'images/WED/PRE/02/21.jpg',
        'images/WED/PRE/02/22.jpg',
        'images/WED/PRE/02/23.jpg',
        'images/WED/PRE/02/24.jpg',
        'images/WED/PRE/02/25.jpg',
        'images/WED/PRE/02/26.jpg',
        'images/WED/PRE/02/27.jpg',
        'images/WED/PRE/02/28.jpg',
        'images/WED/PRE/02/29.jpg',
        'images/WED/PRE/02/30.jpg',
        'images/WED/PRE/02/31.jpg',
        'images/WED/PRE/02/32.jpg',
        'images/WED/PRE/02/33.jpg',
        'images/WED/PRE/02/34.jpg',
        'images/WED/PRE/02/35.jpg',
        'images/WED/PRE/02/36.jpg',
        'images/WED/PRE/02/37.jpg',
        'images/WED/PRE/02/38.jpg',
        'images/WED/PRE/02/39.jpg',
        'images/WED/PRE/02/40.jpg',
        'images/WED/PRE/02/41.jpg',
        'images/WED/PRE/02/42.jpg',
        'images/WED/PRE/02/43.jpg'
      ]
    }
  ],

  baby: [
    {
      id: 'baby-angel',
      title: 'Little Hero',
      cover: 'images/WED/BABYOUTDOOR/1.jpg',
      date: '2024',
      description: 'Adorable newborn photography session',
      photos: [
        'images/WED/BABYOUTDOOR/0.jpg',
        'images/WED/BABYOUTDOOR/1.jpg',
        'images/WED/BABYOUTDOOR/2.jpg',
        'images/WED/BABYOUTDOOR/3.jpg',
        'images/WED/BABYOUTDOOR/4.jpg',
        'images/WED/BABYOUTDOOR/5.jpg',
        'images/WED/BABYOUTDOOR/6.jpg',
        'images/WED/BABYOUTDOOR/7.jpg',
        'images/WED/BABYOUTDOOR/8.jpg',
        'images/WED/BABYOUTDOOR/10.jpg',
        'images/WED/BABYOUTDOOR/11.jpg',
        'images/WED/BABYOUTDOOR/12.jpg',
        'images/WED/BABYOUTDOOR/13.jpg',
        'images/WED/BABYOUTDOOR/14.jpg',
        'images/WED/BABYOUTDOOR/15.jpg',
        'images/WED/BABYOUTDOOR/16.jpg',
        'images/WED/BABYOUTDOOR/17.jpg',
        'images/WED/BABYOUTDOOR/18.jpg',
        'images/WED/BABYOUTDOOR/19.jpg',
        'images/WED/BABYOUTDOOR/20.jpg',
        'images/WED/BABYOUTDOOR/21.jpg',
        'images/WED/BABYOUTDOOR/22.jpg',
        'images/WED/BABYOUTDOOR/23.jpg',
        'images/WED/BABYOUTDOOR/24.jpg',
        'images/WED/BABYOUTDOOR/25.jpg',
        'images/WED/BABYOUTDOOR/26.jpg'
      ]
    },
  ],

  maternity: [
    {
      id: 'maternity-glow',
      title: 'Radiant Glow',
      cover: 'images/0 COVER/5/Maternity Shoot.jpg',
      date: '2024',
      description: 'Beautiful maternity photography',
      photos: [
        'images/0 COVER/Maternity Shoot.jpg',
        'images/0 COVER/Maternity Shoots01.jpg'
      ]
    }
  ],

  couple: [
    {
      id: 'couple-eternal',
      title: 'Eternal Love',
      cover: 'images/01Covera.jpg',
      date: '2024',
      description: 'Romantic couple portrait session',
      photos: [
        'images/01Covera.jpg',
        'images/COVERcopy.jpg'
      ]
    }
  ]
};

// ============================================================
// Hero images for different sections
// ============================================================

window.HERO_IMAGES = {
  home: 'images/01Covera.jpg',
  studio: 'images/0 COVER/Born Baby Photography.jpg',
  outdoor: 'images/0 COVER/1WEDDINGCOVER.jpg',
  about: 'images/COVERcopy.jpg',
  contact: 'images/COVERcopy.jpg', // Mapped from missing hero-contact.jpg
  films: 'images/0 COVER/Film Page.jpg', // Mapped from missing FilmPage(1).jpg
  wedding: 'images/0 COVER/Wedding.jpg',
  engagement: 'images/0 COVER/Engagement.jpg',
  'pre-wedding': 'images/0 COVER/pre-wedding.jpg',
  baby: 'images/WED/BABYOUTDOOR/9.jpg',
  maternity: 'images/0 COVER/Maternity Shoot.jpg',
  portrait: 'images/STUDIO/BORN BABY/06.jpg',
  fashion: 'images/0 COVER/Toddler Photography.jpg',
  family: 'images/STUDIO/FAMILY/19.jpg'
};

// ============================================================
// Cloudinary Auto-Mapping Configuration & Logic
// ============================================================
window.CLOUDINARY_CONFIG = {
  cloudName: 'dnpihrazm', // Replace with your Cloudinary Cloud Name
  enabled: false // Set to true once your photos are uploaded to Cloudinary!
};

(function() {
  if (window.CLOUDINARY_CONFIG && window.CLOUDINARY_CONFIG.enabled && window.CLOUDINARY_CONFIG.cloudName) {
    const cloudName = window.CLOUDINARY_CONFIG.cloudName;
    
    // Recursive mapper function to transform 'images/...' to Cloudinary URLs
    function mapLocalToCloudinary(obj) {
      if (!obj) return obj;
      if (typeof obj === 'string') {
        if (obj.startsWith('images/')) {
          const relativePath = obj.replace('images/', 'umaphotostudio/');
          const extension = relativePath.substring(relativePath.lastIndexOf('.'));
          const basePath = relativePath.substring(0, relativePath.lastIndexOf('.'));
          
          // Sanitize base path (same logic: replace any non-alphanumeric, non-slash, non-dash, non-dot with underscore)
          const cleanBasePath = basePath.replace(/[^A-Za-z0-9\/_\-\.]/g, '_');
          
          return `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto,w_1600/${cleanBasePath}${extension}`;
        }
        return obj;
      }
      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          obj[i] = mapLocalToCloudinary(obj[i]);
        }
        return obj;
      }
      if (typeof obj === 'object') {
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj[key] = mapLocalToCloudinary(obj[key]);
          }
        }
        return obj;
      }
      return obj;
    }
    
    // Auto-transform all local image pathways to premium Cloudinary CDN pathways
    window.APP_DATA = mapLocalToCloudinary(window.APP_DATA);
    window.CATEGORIES = mapLocalToCloudinary(window.CATEGORIES);
    window.ALBUMS = mapLocalToCloudinary(window.ALBUMS);
    window.HERO_IMAGES = mapLocalToCloudinary(window.HERO_IMAGES);
  }
})();
