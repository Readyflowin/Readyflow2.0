// lib/cityData.ts

// 1. Portfolio Items (Ye same rahega)
export const portfolioItems = [
  { 
    name: "Mimito", 
    url: "https://mimito.in/", 
    tag: "Kidswear Fashion",
    platform: "Shopify",
    desc: "High-conversion kidswear store optimized for mobile-first Indian shoppers."
  },
  { 
    name: "Magic Popz", 
    url: "https://magicpopz.in/", 
    tag: "Food & Snacks",
    platform: "WordPress",
    desc: "WooCommerce based food portal for snacks, handling complex regional shipping."
  },
  { 
    name: "Truly Eco", 
    url: "https://trulyeco.org/", 
    tag: "Beauty & Wellness",
    platform: "Shopify",
    desc: "Beauty-specific startup with a clean, high-end aesthetic and fast checkout."
  },
  { 
    name: "Mera Printers", 
    url: "https://meraprinters.com/", 
    tag: "Printing & POD",
    platform: "Custom",
    desc: "Complete printing business solution with automated order processing logic."
  },
  { 
    name: "Galaxy Vcom", 
    url: "https://galaxyvcom.com/", 
    tag: "Tech Agency",
    platform: "WordPress",
    desc: "Clean and professional agency website for high-end web development services."
  },
  { 
    name: "Dharmiq Hub", 
    url: "https://dharmiqhub.in/", 
    tag: "Digital Resources",
    platform: "Custom",
    desc: "A digital hub for community resources and structured learning assets."
  },
];

// 2. Old/Existing Cities (Jo pehle se object format me thi)
const initialCities = {
  indore: {
    name: "Indore",
    niche: "Namkeen & Textile Industry",
    hook: "MP's D2C Capital",
    hinglishHook: "Indore me apni dukaan ko online kaise le jayein?",
    localProblem: "Indore ke Rajwada aur Pithampur ke traders aksar high RTO aur expensive developers se pareshan rehte hain. Hum iska sasta aur pakka solution dete hain.",
    brokenKeywords: "shopify indore, website in indore, saste me website shopify, indore me website banwana hai",
    youtubeId: "dQw4w9WgXcQ", 
    description: "Indore is famous for its snacks and textile hubs. We help local Namkeen brands from Rajwada and industrial units in Pithampur scale globally.",
    industryPoint: "Specialized in weight-based shipping logic for Namkeen brands and high-COD order verification.",
    landmarks: "Rajwada, Chhappan Dukaan, Pithampur, Vijay Nagar",
    keywords: "Shopify developer Indore, Namkeen Shopify setup, Indore D2C expert",
    faqs: [
      { q: "Can you set up local delivery for Indore stores?", a: "Yes, we integrate radius-based delivery for areas like Vijay Nagar and Saket." },
      { q: "How do you handle RTO for Indore namkeen sellers?", a: "We use automated WhatsApp confirmation to verify addresses before shipping." }
    ]
  },
  bhopal: {
    name: "Bhopal",
    niche: "Startups & SMEs",
    hook: "City of Lakes E-commerce",
    hinglishHook: "Bhopal me startup ke liye best e-commerce website kaise banayein?",
    localProblem: "Bhopal ke naye startups ko aksar agency scale support nahi milta. Hum MANIT aur local hubs ke founders ko professional handholding dete hain.",
    brokenKeywords: "shopify developer bhopal, bhopal me website company, e-commerce store bhopal saste me",
    youtubeId: "dQw4w9WgXcQ",
    description: "Bhopal is a rising startup hub. We help Bhopal-based entrepreneurs and artisans launch high-performance stores with local support.",
    industryPoint: "Focus on IT service integration, boutique hotel booking, and Zardosi handicraft showcases.",
    landmarks: "Upper Lake, MANIT, DB City, Arera Colony",
    keywords: "Shopify Bhopal, E-commerce Bhopal, Startup store setup",
    faqs: [
      { q: "Do you support Bhopal-based handicraft brands?", a: "Yes, we specialize in high-fidelity image galleries for products like Zardosi." }
    ]
  },
  surat: {
    name: "Surat",
    niche: "Textiles & Diamonds",
    hook: "Diamond City D2C Revolution",
    hinglishHook: "Surat ke manufacturing business ko D2C brand kaise banayein?",
    localProblem: "Surat ke textile kings B2B toh sambhal lete hain, par D2C customer handling aur fabric patterns online dikhane me fast technology chahiye hoti hai.",
    brokenKeywords: "surat shopify expert, textile website surat, surat me digital marketing, saste me shopify surat",
    youtubeId: "dQw4w9WgXcQ",
    description: "Surat's manufacturers are moving from B2B to D2C. We optimize high-volume stores for Surat's massive markets.",
    industryPoint: "Bulk order features, fabric pattern previews, and secure gateways for high-value diamond jewelry.",
    landmarks: "Diamond Bourse, Textile Market, Varachha, Adajan",
    keywords: "Surat Shopify expert, Textile e-commerce Surat, Surat manufacturing",
    faqs: [
      { q: "Can you build bulk-order features for Surat manufacturers?", a: "Yes, we code custom 'Bulk Add to Cart' and B2B pricing tiers." }
    ]
  },
  jaipur: {
    name: "Jaipur",
    niche: "Tourism & Handicrafts",
    hook: "Globalizing Rajasthani Heritage",
    hinglishHook: "Jaipur ke handicrafts ko poori duniya me kaise bechein?",
    localProblem: "Jaipur ke artisans global reach toh chahte hain, par international payments aur multi-currency setup unke liye bahut mushkil hota hai.",
    brokenKeywords: "shopify developer jaipur, jaipur handicraft online store, jaipur me website banana, rajasthan shopify help",
    youtubeId: "dQw4w9WgXcQ",
    description: "Jaipur's artisans deserve a premium look. We build high-converting stores for Blue Pottery and Ethnic Wear brands.",
    industryPoint: "Multilingual support for international buyers and seasonal sales optimization for tourist peaks.",
    landmarks: "Hawa Mahal, Johari Bazar, Mansarovar, MI Road",
    keywords: "Shopify designer Jaipur, Handicraft store Jaipur, Jaipur ethnic wear",
    faqs: [
      { q: "Do you support international shipping setup?", a: "Yes, we configure DHL/FedEx and multi-currency for international Jaipur exports." }
    ]
  },
  bangalore: {
    name: "Bangalore",
    niche: "Tech & SaaS Startups",
    hook: "Silicon Valley Store Hub",
    hinglishHook: "Bangalore me tech-forward Shopify store setup kaise karein?",
    localProblem: "Bangalore ke founders ko basic theme nahi, advanced headless setups aur API integrations chahiye hote hain. Hum wahi technical depth dete hain.",
    brokenKeywords: "bangalore shopify agency, startup website bangalore, headless shopify india, e-commerce dev bangalore",
    youtubeId: "dQw4w9WgXcQ",
    description: "For Bangalore's tech-forward brands, we provide advanced Shopify integrations and custom API connections.",
    industryPoint: "Advanced ERP/CRM integrations and subscription-based e-commerce models.",
    landmarks: "Indiranagar, HSR Layout, Koramangala, Whitefield",
    keywords: "Bangalore Shopify consultancy, Headless Shopify Bangalore, Tech e-commerce",
    faqs: [
      { q: "Do you offer Headless Shopify (Hydrogen)?", a: "Yes, we specialize in ultra-fast headless storefronts for Bangalore startups." }
    ]
  },
  ahmedabad: {
    name: "Ahmedabad",
    niche: "Pharma & D2C Brands",
    hook: "Gujarat's Business Powerhouse",
    hinglishHook: "Ahmedabad me pharma ya D2C business ke liye website banwani hai?",
    localProblem: "Ahmedabad ke business owners ko professional stores chahiye jo trust build karein, par badi agencies ka pricing bahut out of reach hota hai.",
    brokenKeywords: "ahmedabad shopify developer, gujarat me website banana, pharma e-commerce india, shopify expert ahmedabad",
    youtubeId: "dQw4w9WgXcQ",
    description: "From pharma giants to rising D2C labels, Ahmedabad is a commerce leader. We build secure and fast stores.",
    industryPoint: "Compliance-heavy pharma catalogs and localized Gujarati support for traditional sellers.",
    landmarks: "C.G. Road, SG Highway, Manek Chowk, Prahlad Nagar",
    keywords: "Shopify Ahmedabad, E-commerce Ahmedabad, Pharma Shopify setup",
    faqs: [
      { q: "Can you make the store in Gujarati?", a: "Yes, we provide full localization for regional Gujarat markets." }
    ]
  },
  mumbai: {
    name: "Mumbai",
    niche: "Fashion & Entertainment",
    hook: "Scale with the City of Dreams",
    hinglishHook: "Mumbai me fashion label ya celebrity brand online kaise launch karein?",
    localProblem: "Mumbai ki fast lifestyle me brands ko aisi site chahiye jo viral traffic (celeb drops) handle kar sake bina crash huye.",
    brokenKeywords: "shopify mumbai, fashion website dev mumbai, mumbai e-commerce agency, luxury brand shopify india",
    youtubeId: "dQw4w9WgXcQ",
    description: "Mumbai demands speed and style. We build high-performance stores for fashion labels and celebrity merchandise.",
    industryPoint: "Scalability for viral celebrity sales and high-end aesthetic design for luxury shoppers.",
    landmarks: "Colaba, Bandra, Juhu, Nariman Point",
    keywords: "Shopify Mumbai, Luxury store development, Mumbai fashion Shopify",
    faqs: [
      { q: "Can you handle high-traffic flash sales?", a: "Our Mumbai setups are optimized for 5,000+ concurrent visitors during drops." }
    ]
  },
  delhi: {
    name: "Delhi",
    niche: "Wholesale & Corporate",
    hook: "India's Capital Commerce",
    hinglishHook: "Delhi/NCR me wholesale business ko online store me kaise badlein?",
    localProblem: "Chandni Chowk se Gurgaon tak, business toh bade hain par unhe 'D2C conversion' ka technical darr lagta hai. Hum use simplify karte hain.",
    brokenKeywords: "delhi shopify developer, chandni chowk wholesale online, gurgaon ecommerce company, website developer delhi saste me",
    youtubeId: "dQw4w9WgXcQ",
    description: "Delhi/NCR businesses need professional authority. We help wholesale giants scale nationally.",
    industryPoint: "B2B features for large-scale sellers and custom checkout flows.",
    landmarks: "Connaught Place, Chandni Chowk, Saket, Gurgaon Cyber Hub",
    keywords: "Shopify expert Delhi, NCR Shopify services, Wholesale Shopify Delhi",
    faqs: [
      { q: "Do you build B2B wholesale portals?", a: "Yes, with password protection and bulk-pricing logic for Delhi wholesalers." }
    ]
  },
  hyderabad: {
    name: "Hyderabad",
    niche: "IT & Traditional Pearls",
    hook: "HITEC City E-commerce Growth",
    hinglishHook: "Hyderabad me IT startups aur pearl businesses ke liye best Shopify help?",
    localProblem: "Hyderabad me traditional pearl shops ko digital aane me security aur payment protection ki chinta hoti hai. Hum safe setups dete hain.",
    brokenKeywords: "hyderabad shopify help, pearl shop online hyderabad, telangana e-commerce dev, shopify developer hyderabad",
    youtubeId: "dQw4w9WgXcQ",
    description: "Bridging the gap between traditional pearl markets and modern IT startups in Telangana.",
    industryPoint: "Bilingual (Telugu/English) support and custom composite listings for jewelry.",
    landmarks: "HITEC City, Charminar, Banjara Hills, Jubilee Hills",
    keywords: "Shopify developer Hyderabad, Hyderabad pearls online, IT startups Shopify",
    faqs: [
      { q: "Is Telugu support available?", a: "Yes, we can localize your store for the Hyderabad region." }
    ]
  },
  kolkata: {
    name: "Kolkata",
    niche: "Handloom & Tea Culture",
    hook: "Cultural Heritage Online",
    hinglishHook: "Kolkata ke handloom aur tea business ke liye digital dukaan kaise kholein?",
    localProblem: "Kolkata ke heritage businesses ko lagta hai ki digital aana mehenga hai. Hum affordable solutions dete hain.",
    brokenKeywords: "kolkata shopify developer, handloom store online kolkata, west bengal ecommerce help, saste me website kolkata",
    youtubeId: "dQw4w9WgXcQ",
    description: "Kolkata's handloom weavers and tea merchants have a global audience. We digitize tradition.",
    industryPoint: "Custom size charts for sarees and subscription models for premium tea.",
    landmarks: "Howrah Bridge, Park Street, Salt Lake, New Market",
    keywords: "Shopify Kolkata, Handloom Shopify setup, Kolkata tea exporters",
    faqs: [
      { q: "Can you set up subscription boxes for tea?", a: "Yes, we use Shopify Subscriptions for monthly tea delivery models." }
    ]
  }
};

// 3. New Cities Batch (PASTE NEW JSON ARRAY HERE)
// Bas yahan naye array ko paste karte jao (append karo ya replace karo)
const newCityBatches = [
  {
    "key": "chennai",
    "name": "Chennai",
    "niche": "IT & Automotive Industry",
    "hook": "South India's Auto & Tech Hub",
    "hinglishHook": "Chennai mein apni dukaan ko online kaise le jayein?",
    "localProblem": "Chennai ke Oragadam aur Sriperumbudur ke auto parts suppliers expensive web developers se pareshan hain. Hum unhe ek sasta aur pakka digital solution dete hain.",
    "brokenKeywords": "shopify chennai, website in chennai, saste me shopify store, chennai me dukaan banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Chennai, often called the 'Detroit of Asia', is a major automotive manufacturing hub with clusters like Oragadam and Sriperumbudur. It also has a vibrant IT and SaaS ecosystem along the OMR corridor, making it ideal for digital commerce solutions.",
    "industryPoint": "Advanced variant management for auto parts and subscription billing for SaaS products.",
    "landmarks": "T. Nagar, Anna Salai (Mount Road), Oragadam Industrial Park, Sriperumbudur",
    "keywords": "Shopify developer Chennai, Automotive e-commerce Chennai, SaaS Shopify setup",
    "faqs": [
      {
        "q": "How can Chennai auto parts businesses sell products online?",
        "a": "We tailor Shopify stores for auto parts vendors with advanced search and shipping setup, perfect for Chennai manufacturers."
      },
      {
        "q": "Can startups on OMR use Shopify for their SaaS products?",
        "a": "Yes, we integrate subscription and digital delivery features so Chennai's tech startups can sell software online."
      },
      {
        "q": "Will I get local support in Chennai for my Shopify store?",
        "a": "Absolutely, our Chennai-based team provides end-to-end support, ensuring your store appeals to local customers."
      }
    ]
  },
  {
    "key": "pune",
    "name": "Pune",
    "niche": "Education & Automotive Industry",
    "hook": "Maharashtra's Education & Auto Hub",
    "hinglishHook": "Pune mein apni dukaan ko online kaise le jayein?",
    "localProblem": "Pune ke Pimpri-Chinchwad ke auto parts suppliers aur FC Road ke coaching centers high web developer fees se pareshan hain. Hum unko cost-effective solution dete hain.",
    "brokenKeywords": "shopify pune, website banwana pune, saste me dukaan online pune, pune me shopify store",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Pune, known as the 'Oxford of the East', has a strong educational ecosystem with many colleges and coaching centers. It is also a major automotive manufacturing hub (Pimpri-Chinchwad, Bhosari), offering diverse opportunities for e-commerce in education and industry.",
    "industryPoint": "Multi-language support for educational institutions and bulk inventory management for auto parts.",
    "landmarks": "Laxmi Road, Shaniwar Wada, Pimpri-Chinchwad Industrial Area, FC Road",
    "keywords": "Shopify developer Pune, Automotive e-commerce Pune, Pune education websites",
    "faqs": [
      {
        "q": "How can educational institutes in Pune sell courses online?",
        "a": "We integrate course sales and membership features on Shopify, enabling Pune coaching centers to offer classes and materials online."
      },
      {
        "q": "Can my auto parts company in Pune use Shopify?",
        "a": "Yes, we configure Shopify with large product catalogs and shipping options to serve Pune's automotive suppliers."
      },
      {
        "q": "Will setting up a Pune Shopify store take a long time?",
        "a": "Our experts quickly launch stores by using proven templates and focusing on local needs, so Pune businesses go online fast."
      }
    ]
  },
  {
    "key": "gurgaon",
    "name": "Gurgaon",
    "niche": "Corporate & D2C Brands",
    "hook": "NCR's Startup & Corporate Hub",
    "hinglishHook": "Gurgaon mein apni dukaan ko online kaise le jayein?",
    "localProblem": "Gurgaon ke Cyber City startups aur MG Road wale D2C brand owners high web developer fees se pareshan hain. Hum unko budget-friendly solution leke aate hain.",
    "brokenKeywords": "shopify gurgaon, website banwana gurgaon, saste me shopify gurgaon, gurgaon me dukaan banani hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Gurgaon is a major corporate and startup hub in the Delhi NCR. It hosts multinational offices (Cyber City, Udyog Vihar) and a booming D2C market, making it ideal for e-commerce innovation.",
    "industryPoint": "B2B bulk ordering features for corporate clients and social commerce integrations for Gurgaon’s D2C brands.",
    "landmarks": "Cyber City, MG Road, DLF Cyber Hub, Udyog Vihar",
    "keywords": "Shopify Gurgaon expert, Gurgaon D2C ecommerce, Corporate e-commerce Gurgaon",
    "faqs": [
      {
        "q": "Can Gurgaon startups on Cyber City easily get Shopify support?",
        "a": "Yes, we have Gurgaon-based developers familiar with Cyber City businesses to launch your Shopify store quickly."
      },
      {
        "q": "How do D2C brands in Gurgaon boost sales with Shopify?",
        "a": "We integrate social media selling (Instagram Shop, Facebook) and local payment options to increase visibility and sales."
      },
      {
        "q": "Is Shopify suitable for large corporate catalogs in Gurgaon?",
        "a": "Absolutely, Shopify Plus can handle thousands of products and inventory syncing, ideal for Gurgaon’s corporate suppliers."
      }
    ]
  },
  {
    "key": "noida",
    "name": "Noida",
    "niche": "Electronics & Apparel Industry",
    "hook": "UP's Electronics & Retail Hub",
    "hinglishHook": "Noida mein apni dukaan ko online kaise le jayein?",
    "localProblem": "Noida ke Sector 63 ke electronics manufacturers aur Apparel Park ke garment traders high website fees se pareshan hain. Hum unko cost-effective solution dete hain.",
    "brokenKeywords": "shopify noida, website banwana noida, saste me shopify noida, noida me dukaan banani hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Noida is a tech and retail hub in the Delhi NCR. It has a cluster of electronics manufacturers (Sector 63) and garment producers (Apparel Park), making it ripe for e-commerce solutions.",
    "industryPoint": "Detailed variant/size selectors for fashion retailers and inventory syncing for electronics vendors.",
    "landmarks": "Sector 18, Sector 63, DLF Mall of India, Apparel Park (Greater Noida)",
    "keywords": "Shopify Noida developer, Noida electronics ecommerce, Noida apparel store",
    "faqs": [
      {
        "q": "How can electronics businesses in Noida go online?",
        "a": "We integrate Shopify with inventory systems for electronics, enabling multichannel sales (online and offline)."
      },
      {
        "q": "Can Shopify handle custom sizing features for apparel?",
        "a": "Yes, we set up advanced size charts and variant options so Noida fashion brands can sell easily online."
      },
      {
        "q": "What about support for local languages on my Noida store?",
        "a": "We can add Hindi language and local payment methods (Paytm, UPI) to make the site customer-friendly."
      }
    ]
  },
  {
    "key": "navi mumbai",
    "name": "Navi Mumbai",
    "niche": "Logistics & Warehousing Industry",
    "hook": "Mumbai's Logistics Gateway",
    "hinglishHook": "Navi Mumbai mein apni dukaan ko online kaise le jayein?",
    "localProblem": "Navi Mumbai ke JNPT (Nhava Sheva Port) aur Taloja warehousing companies shipping aur inventory management se pareshan hain. Hum unko modern digital solution dete hain.",
    "brokenKeywords": "shopify navi mumbai, website banwana navi mumbai, saste me shopify navi mumbai, navi mumbai me dukaan banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Navi Mumbai is a major logistics and industrial suburb of Mumbai. With JNPT (Nhava Sheva Port) and extensive warehousing (Taloja, Turbhe), it needs robust e-commerce logistics solutions.",
    "industryPoint": "Real-time shipment tracking and inventory synchronization for logistics firms.",
    "landmarks": "JNPT (Nhava Sheva Port), Vashi, Airoli, Taloja MIDC",
    "keywords": "Navi Mumbai logistics Shopify, Warehousing e-commerce, JNPT business online",
    "faqs": [
      {
        "q": "Can Shopify manage multiple warehouses and inventory in Navi Mumbai?",
        "a": "Yes, we integrate multi-location inventory and barcode systems so you can track stock across sites."
      },
      {
        "q": "How do we handle shipping for logistics clients on Shopify?",
        "a": "We set up dynamic shipping rates and carrier integrations (like Delhivery) tailored for Navi Mumbai routes."
      },
      {
        "q": "Will my Vashi-based warehouse get local support?",
        "a": "Absolutely, our team covers Navi Mumbai areas to assist local businesses at every step."
      }
    ]
  },
  {
    "key": "thane",
    "name": "Thane",
    "niche": "Real Estate & Retail Industry",
    "hook": "Mumbai's Satellite Sales Hub",
    "hinglishHook": "Thane mein apni dukaan ko online kaise le jayein?",
    "localProblem": "Thane ke Ghodbunder Road par shops aur Majiwada ke property brokers high marketing cost se pareshan hain. Hum unko online solution dete hain.",
    "brokenKeywords": "shopify thane, website banwana thane, saste me shopify thane, thane me dukaan online",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Thane is a bustling suburban city near Mumbai with a booming real estate market. Ghodbunder Road and Majiwada are known for residential projects and retail malls, offering strong opportunities for online property listings and retail stores.",
    "industryPoint": "Property listing modules and multi-language storefronts for local retail brands.",
    "landmarks": "Ghodbunder Road, Korum Mall, Majiwada, Thane Station",
    "keywords": "Shopify developer Thane, Thane real estate e-commerce, Thane retail online",
    "faqs": [
      {
        "q": "How can Thane real estate agents use Shopify?",
        "a": "We add property listing pages and contact forms so Thane builders can showcase projects online."
      },
      {
        "q": "Is Shopify good for retail stores in Thane?",
        "a": "Yes, we create user-friendly retail websites with local language options to attract Thane shoppers."
      },
      {
        "q": "How quickly can my store launch in Thane?",
        "a": "Our team will set up and launch your Thane store fast by using tailored templates and local insights."
      }
    ]
  },
  {
    "key": "faridabad",
    "name": "Faridabad",
    "niche": "Industrial Machinery & Manufacturing",
    "hook": "Haryana's Manufacturing Powerhouse",
    "hinglishHook": "Faridabad mein apni dukaan ko online kaise le jayein?",
    "localProblem": "Faridabad ke Sector 16 ke machinery suppliers aur steel traders digital presence na hone se pareshan hain. Hum unke liye ek sasta online platform dete hain.",
    "brokenKeywords": "shopify faridabad, website banwana faridabad, saste me shopify faridabad, faridabad me dukaan online",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Faridabad is a large industrial city near Delhi, famous for manufacturing machinery and steel. It has extensive industrial areas (Sector 16, Bata Chowk), making it well-suited for B2B e-commerce solutions.",
    "industryPoint": "Bulk order forms and CAD attachment support for machinery businesses.",
    "landmarks": "Sector 16, Bata Chowk, Neelam Chowk, Surajkund",
    "keywords": "Faridabad Shopify developer, Industrial machinery ecommerce, Faridabad manufacturing",
    "faqs": [
      {
        "q": "How can heavy machinery sellers in Faridabad use Shopify?",
        "a": "We integrate custom quote modules and large product catalogs to help manufacturers sell online."
      },
      {
        "q": "Can Shopify handle bulk orders for Faridabad factories?",
        "a": "Yes, we enable bulk ordering and multiple pricing tiers on Shopify specifically for heavy industries."
      },
      {
        "q": "Will Faridabad businesses get after-sales support?",
        "a": "Absolutely, our team provides ongoing support so Faridabad businesses can run smoothly online."
      }
    ]
  },
  {
    "key": "ghaziabad",
    "name": "Ghaziabad",
    "niche": "Manufacturing & Industry",
    "hook": "UP's Manufacturing Powerhouse",
    "hinglishHook": "Ghaziabad mein apni dukaan ko online kaise le jayein?",
    "localProblem": "Ghaziabad ke Sahibabad Industrial Area ke manufacturers aur Indirapuram ke traders high website fees se pareshan hain. Hum unko cost-effective solution dete hain.",
    "brokenKeywords": "shopify ghaziabad, website banwana ghaziabad, saste me shopify ghaziabad, ghaziabad me dukaan online",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Ghaziabad is an industrial city in Uttar Pradesh, part of Delhi NCR. It hosts manufacturing hubs (Sahibabad Industrial Area, Industrial Park) producing electronics and consumer goods, making it ripe for B2B and D2C e-commerce.",
    "industryPoint": "Automated invoicing and multiple user accounts for manufacturing stores.",
    "landmarks": "Sahibabad Industrial Area, Indirapuram, Vaishali, Raj Nagar",
    "keywords": "Shopify Ghaziabad expert, Ghaziabad manufacturing ecommerce, Industrial e-commerce Ghaziabad",
    "faqs": [
      {
        "q": "Can we sell industrial equipment online in Ghaziabad?",
        "a": "Yes, we build Shopify stores with product catalogs and quote requests suitable for manufacturers."
      },
      {
        "q": "How is shipping handled for Ghaziabad goods?",
        "a": "We set up logistic integrations (like Delhivery) and local pickup options specific to Ghaziabad addresses."
      },
      {
        "q": "Do you provide support in local languages for Ghaziabad merchants?",
        "a": "We offer bilingual support (Hindi/English) so Ghaziabad businesses easily understand and manage their stores."
      }
    ]
  },
  {
    "key": "gandhinagar",
    "name": "Gandhinagar",
    "niche": "Government & FinTech Industry",
    "hook": "Gujarat's Administrative & Fintech Hub",
    "hinglishHook": "Gandhinagar mein apni dukaan ko online kaise le jayein?",
    "localProblem": "Gandhinagar ke Secretariat aur GIFT City ke fintech startups traditional marketing se pareshan hain. Hum unko modern online solution dete hain.",
    "brokenKeywords": "shopify gandhinagar, website banwana gandhinagar, saste me shopify gandhinagar, gandhinagar me dukaan online",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Gandhinagar is Gujarat’s capital city, known for its government institutions and the GIFT City financial hub. It attracts government trade and tech firms, making it ideal for e-commerce solutions tailored to regulatory and finance needs.",
    "industryPoint": "GST compliance and secure checkout for government contracts, plus multi-currency support for GIFT City firms.",
    "landmarks": "GIFT City, Gujarat Secretariat, Akshardham Temple, Sector 8 Bus Station",
    "keywords": "Shopify Gandhinagar, Gujarat government e-commerce, GIFT City commerce",
    "faqs": [
      {
        "q": "Will Shopify work for my government-affiliated business in Gandhinagar?",
        "a": "Yes, we ensure GST compliance and secure payments on Shopify, suitable for government trade stores."
      },
      {
        "q": "How can fintech startups in GIFT City use Shopify?",
        "a": "We implement multi-currency checkouts and high-volume transaction support for GIFT City companies."
      },
      {
        "q": "Is Shopify available in local languages for Gandhinagar?",
        "a": "We add Gujarati and Hindi language options to your Shopify theme to cater to Gandhinagar customers."
      }
    ]
  }
];

// 4. Magic: Convert Array to Object & Merge
// Ye code automatically "key" property utha ke object bana dega
const processedNewCities = newCityBatches.reduce((acc, city) => {
  // Use 'key' from JSON as the object key (e.g., 'chennai', 'pune')
  if(city.key) {
    acc[city.key] = city;
  }
  return acc;
}, {} as any);

// ============================================================
// BATCH 2: NEW CITIES (Paste kiya hua naya data)
// ============================================================
const batch2 = [
  {
    "key": "tirupur",
    "name": "Tirupur",
    "niche": "Knitwear & Apparel",
    "hook": "India's Knitwear Capital",
    "hinglishHook": "Tiruppur-la unga dukkan-ai online eppadi katturuvom?",
    "localProblem": "Tiruppur ke Avinashi Road aur NHC Market ke garment vyapari mehngi website development aur international shipping cost se pareshaan hain. ReadyFlow unke liye ek affordable aur pakka online solution deta hai.",
    "brokenKeywords": "shopify tirupur, website in tirupur, saste me dukaan online, tirupur me website banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Tirupur’s knitwear cluster, long known as a major apparel export hub, is now rapidly shifting toward direct online sales. The city’s powerful garment ecosystem is embracing D2C channels, opening new opportunities for local manufacturers.",
    "industryPoint": "Custom size charts for knitwear collections and bulk order management for garment exports.",
    "landmarks": "Avinashi Road, NHC Market, Kumaran Road, Karur Road",
    "keywords": "Shopify developer Tirupur, Tirupur knitwear store, Tirupur apparel D2C",
    "faqs": [
      {
        "q": "Tiruppur-le unga dukkan-ai online la eppadi katturuvom?",
        "a": "We help Tirupur merchants by creating their Shopify store with local language support, uploading products and images for their knitwear, and setting up payment and shipping, so they can reach customers online immediately."
      },
      {
        "q": "Hamare liye ek website banwane me kitna time aur paisa lagega?",
        "a": "Hamara team sirf kuch hi dinon me ek complete Shopify store set up kar deta hai. Aapko sirf products dekhkar hume details deni hai – baki design, hosting aur technical setup hum dekhenge."
      },
      {
        "q": "Bhari garments ya export orders ki delivery kaise manage hogi?",
        "a": "Hum weight-based shipping integration set karte hain aur local couriers ka arrangement karte hain. Is se heavy garment shipments ke liye rates sahi rehte huye timely delivery ho jati hai."
      }
    ]
  },
  {
    "key": "ludhiana",
    "name": "Ludhiana",
    "niche": "Hosiery & Woolens",
    "hook": "Punjab's Hosiery Capital",
    "hinglishHook": "Ludhiana vich hosiery dukaan nu online kidda le jayiye?",
    "localProblem": "Ludhiana ke Ghumar Mandi aur Focal Point ke hosiery dukandaar ko online payment aur shipping issues se pareshani hoti hai. ReadyFlow unhe ek affordable aur reliable Shopify solution provide karta hai.",
    "brokenKeywords": "shopify ludhiana, hosiery website ludhiana, saste me dukaan online, ludhiana me website banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Ludhiana has long been a leading hub for woollen and hosiery products. Its thousands of small knitwear factories produce a substantial share of India’s winter garments, making it ripe for direct-to-consumer online expansion.",
    "industryPoint": "Custom size charts for knitwear products and seasonal inventory management for woolens.",
    "landmarks": "Focal Point Market, Ghumar Mandi, Pakhowal Road, Model Town",
    "keywords": "Shopify developer Ludhiana, Ludhiana hosiery store, Ludhiana D2C expert",
    "faqs": [
      {
        "q": "Ludhiana vich hosiery dukaan online kiven start kar sakde?",
        "a": "ReadyFlow aapke liye poora Shopify store setup karta hai – hum products list karte hain aur Punjabi/Hindi mein details bhi daalte hain, taki Ludhiana ke vyapari seedha customers tak pahunch sakein."
      },
      {
        "q": "Website banwane me kitna samay aur kharcha aayega?",
        "a": "Hamari team sirf kuch din me aapke liye store bana deti hai. Aap products ki photos aur information de dein, baaki development, hosting aur integrations hum handle karenge."
      },
      {
        "q": "Local customers ke liye COD ya online payment kaise kaam karega?",
        "a": "Hum Ludhiana-friendly payment gateways integrate karte hain aur cash-on-delivery options enable karte hain. Isse aapke customers ke liye payment aur delivery process asaan ho jati hai."
      }
    ]
  },
  {
    "key": "coimbatore",
    "name": "Coimbatore",
    "niche": "Textiles & Pumps",
    "hook": "Tamil Nadu's Textiles & Pumps Hub",
    "hinglishHook": "Kovai-le apgan dukaan-ai eppadi online-la start pana vendum?",
    "localProblem": "Coimbatore ke Avinashi Road aur RS Puram ke textile aur pump vyapari hamare expensive developers aur delayed shipping se pareshaan hain. ReadyFlow unke liye ekdum sasta aur reliable e-commerce solution lata hai.",
    "brokenKeywords": "shopify coimbatore, website in coimbatore, saste me dukaan online, coimbatore me website banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Coimbatore has long been known for its textile production. It also produces pumps, automotive parts and machinery, giving the city a diverse industrial base with strong potential for online retail expansion.",
    "industryPoint": "Technical specification sheets for pump products and custom size/length variants for textile products.",
    "landmarks": "Avinashi Road, Town Hall, RS Puram, Peelamedu",
    "keywords": "Shopify developer Coimbatore, Coimbatore pumps ecommerce, Coimbatore textiles D2C",
    "faqs": [
      {
        "q": "Kovai-le apgan dukaan-ai eppadi online-la start pana vendum?",
        "a": "Ham aapke liye Shopify store setup karte hain, products ko Tamil/English me list karte hain, aur local payment aur shipping integrate karte hain, taki Coimbatore ke vyapari asaani se online bikri shuru kar saken."
      },
      {
        "q": "Hamare pump aur textile products ke liye special features kaise milenge?",
        "a": "Hum advanced plugins use karte hain jisse aap pump ke technical specs, capacities waghairah upload kar sakte hain. Textile ke liye bhi size aur length ka selection feature available hoga."
      },
      {
        "q": "Local delivery aur payment kaise manage hoga?",
        "a": "Hum Tamil Nadu-friendly payment gateways integrate karte hain aur weight-based shipping setup karte hain. Isse aapke local customers ko reliable delivery aur payment options milte hain."
      }
    ]
  },
  {
    "key": "bhilwara",
    "name": "Bhilwara",
    "niche": "Suitings & Fabrics",
    "hook": "Rajasthan's Textile Powerhouse",
    "hinglishHook": "Bhilwara me apni kapda ki dukaan online kaise le jayein?",
    "localProblem": "Bhilwara ke Adarsh Nagar aur Naya Bhopura ke suitings dukandaar mehngi website development aur shipping charges se pareshan rehte hain. ReadyFlow unke liye ekdam budget-friendly Shopify solution banata hai.",
    "brokenKeywords": "shopify bhilwara, website in bhilwara, saste me dukaan online, bhilwara me website banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Bhilwara’s textile sector commands around ₹25,000 crore in annual turnover, producing about half of India’s polyester suiting fabrics. This scale of manufacturing creates a prime opportunity for local fabric and apparel sellers to reach a global audience through e-commerce.",
    "industryPoint": "Online fabric swatch galleries and bulk-order pricing features for suiting and shirting businesses.",
    "landmarks": "Adarsh Nagar, Naya Bhopura, Danta, Kherapura",
    "keywords": "Shopify developer Bhilwara, Bhilwara fabrics ecommerce, Rajasthan textile D2C",
    "faqs": [
      {
        "q": "Bhilwara ke kapda vikreta apni website kaise banvayen?",
        "a": "ReadyFlow aapke liye complete Shopify store setup karta hai: aapke fabrics ki photos upload karke, Hindi/English descriptions likhkar, aur payment/shipping integrate karke, taki aap asaani se online bechna shuru kar saken."
      },
      {
        "q": "Kya website pe fabric ke liye color swatches upload kar sakte hain?",
        "a": "Bilkul. Ham feature enable karte hain jahan aap har fabric ke color aur pattern ke swatches dikha sakte hain, taaki customers har variant chun saken."
      },
      {
        "q": "Local shipping aur COD kaise manage hoga Bhilwara mein?",
        "a": "Hum weight-based shipping rates aur local courier integration set karte hain. Aap cash-on-delivery options bhi de sakte hain, jo Bhilwara ke local buyers ko asaan lagta hai."
      }
    ]
  },
  {
    "key": "panipat",
    "name": "Panipat",
    "niche": "Carpets & Blankets",
    "hook": "Haryana's Rug Capital",
    "hinglishHook": "Panipat me apni dukaan online kaise le jayein?",
    "localProblem": "Panipat ke Kabari Bazaar aur Insar Bazaar ke carpet traders heavy shipping aur global competition se pareshaan hain. ReadyFlow unke liye ekdam sasta aur reliable Shopify store solution laata hai.",
    "brokenKeywords": "shopify panipat, website in panipat, saste me dukaan online, panipat me website banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Panipat has emerged as one of the world’s largest textile recycling hubs. Its industries convert enormous volumes of discarded fabric into rugs, blankets and yarn, indicating strong potential for D2C online sales of home textiles.",
    "industryPoint": "Weight-based shipping and inventory management for heavy carpet and blanket products.",
    "landmarks": "Kabari Bazaar, Insar Bazaar, Palika Bazar, 11-Ward Chowk",
    "keywords": "Shopify developer Panipat, Panipat carpet ecommerce, Rug Shopify store",
    "faqs": [
      {
        "q": "Panipat vich carpet tyar karan wale apni dukaan online kiven shuru kar sakde?",
        "a": "ReadyFlow tuhade layi Shopify store setup karega, products di listing karega te Punjabi/Hindi vich description kardega, jiste Panipat de carpet vyapari seedha online customers tak pahunch saken."
      },
      {
        "q": "Bhaari carpets di delivery te shipping kiven manage hogi?",
        "a": "Asi weight-based shipping rates integrate karde haan te local couriers nal samjhauta karde haan, taki bhari blankets te carpets sahi rate te safe deliver ho saken."
      },
      {
        "q": "Online listing vich colors te designs di coverage kiven kariye?",
        "a": "Tusi detail-oriented product galleries bana sakde ho jithe har carpet design de high-res photos te color variants dekhe ja sake, taaki customers nu har option dikhaye ja sake."
      }
    ]
  },
  {
    "key": "ichalkaranji",
    "name": "Ichalkaranji",
    "niche": "Textile & Powerloom",
    "hook": "Maharashtra's Textile Powerhouse",
    "hinglishHook": "Ichalkaranji madhe textile dukaan-online kasa suru karnaar?",
    "localProblem": "Ichalkaranji ke Ajinkya Nagar aur Gokulnagar ke textile vyapari mehngi developers aur slow shipping se pareshaan hain. ReadyFlow unke liye localized Shopify solution lata hai.",
    "brokenKeywords": "shopify ichalkaranji, website in ichalkaranji, saste me dukaan online, ichalkaranji me website banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Ichalkaranji, often called the 'Manchester of Maharashtra', has a powerful textile industry built on thousands of power looms. This strong weaving cluster means local garment makers are well-positioned to grow through direct online sales.",
    "industryPoint": "High-resolution fabric images and multi-lot bulk order configuration for powerloom textiles.",
    "landmarks": "Ajinkya Nagar, DKTE Circle, Gokulnagar, Station Road",
    "keywords": "Shopify developer Ichalkaranji, Textile ecommerce India, Maharashtra D2C expert",
    "faqs": [
      {
        "q": "Ichalkaranji madhe textile dukaan-online kasa suru karnaar?",
        "a": "Ham aplyala Shopify store bananyasathi madat karto: product list karnyasathi photographs ghaun, Marathi/English descriptions takun, ani payment-shipping integrate karnyasathi setup karto, jenne Ichalkaranji dukanadar online vikri suru karu shaktat."
      },
      {
        "q": "Website ready karnyasathi kithi vel lagel?",
        "a": "Amchi team fkt kahi divasachya velat Shopify store set karto. Tumhi fakta product information dya, bachi design ani technical setup apale support karto."
      },
      {
        "q": "Local customers si COD ya payment ksha honaar?",
        "a": "Amhi state-friendly payment gateways integrate karto aani weight-based shipping set karto. Ya mule aplya Marathi region madhe vyakti sanda payment ani delivery sobat agadi sukhat upyog karu shaktat."
      }
    ]
  },
  {
    "key": "erode",
    "name": "Erode",
    "niche": "Turmeric & Textiles",
    "hook": "Tamil Nadu's Turmeric & Textile Hub",
    "hinglishHook": "Erode me apna dukaan online kaise le jayein?",
    "localProblem": "Erode ke Clock Tower aur Texvalley ke turmeric aur textile vyapari manual dhande aur limited reach se pareshaan hain. ReadyFlow unke liye seedhi aur sasti Shopify ecommerce solution laata hai.",
    "brokenKeywords": "shopify erode, website in erode, saste me dukaan online, erode me website banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Erode hosts India’s second-largest turmeric market and around 250,000-300,000 handlooms in its textile sector. This powerful combination of spice trading and fabric manufacturing creates strong opportunities for local businesses to sell online.",
    "industryPoint": "Bulk packing and GST-compliant invoicing for spices, and bundling products with textile inventories for handloom sellers.",
    "landmarks": "Clock Tower, Texvalley, Veerappan Nagar, Karungalpalayam",
    "keywords": "Shopify developer Erode, Erode turmeric ecommerce, Tamil Nadu textile store",
    "faqs": [
      {
        "q": "Erode-la unga spice matrum textile dukaan-ai eppadi online-la setu pannuvom?",
        "a": "ReadyFlow unga site create pandradhu: namma Tamil/English la product list pannuvom, turmeric grade and fabric details kudukkam, payment/courier integrate panni online sales start pannalam."
      },
      {
        "q": "Website-la apng kurkume quality certificates upload panna mudiyuma?",
        "a": "Yes, we can add a section for certifications and origin details, so customers can verify spice quality or textile authenticity directly on the site."
      },
      {
        "q": "Local customers ko buy in Erode kaise ensure karein?",
        "a": "Hum Tamil Nadu-based payment gateways aur local logistics se connect karte hain. Isse Erode ke buyers asani se online buy kar ke reliable delivery paa sakte hain."
      }
    ]
  },
  {
    "key": "salem",
    "name": "Salem",
    "niche": "Steel & Sarees",
    "hook": "Tamil Nadu's Steel & Silk Hub",
    "hinglishHook": "Salem me apni dukaan online kaise le jayein?",
    "localProblem": "Salem ke Shastri Nagar aur Shevapet ke saree weavers aur steel traders development cost aur shipping delays se pareshaan hain. ReadyFlow unke liye customized Shopify solution banata hai.",
    "brokenKeywords": "shopify salem, website in salem, saste me dukaan online, salem me website banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Salem is a major center for both steel production and textile weaving. It hosts significant manufacturing plants (e.g., Salem Steel Plant) as well as traditional saree markets, suggesting strong opportunities for online sales in heavy industry and traditional textiles alike.",
    "industryPoint": "Weight-based shipping rules for steel products and multi-variant customization for silk sarees.",
    "landmarks": "Shevapet, Mettur Dam, Shastri Nagar, Karumandapam",
    "keywords": "Shopify developer Salem, Salem saree ecommerce, Tamil Nadu D2C expert",
    "faqs": [
      {
        "q": "Salem me client tak hamare heavy steel saman kaise pahunchyega?",
        "a": "ReadyFlow shipping modules integrate weight-based rates and reliable logistics partners. Aap ke liye robust delivery setup karenge taki heavy steel products bhi safe paunch jayen."
      },
      {
        "q": "Sarees ke liye website me color aur pattern dikhane ka kya upay?",
        "a": "Hum website par saree ke har color aur border ka high-quality photo gallery banate hain, jisse customers asani se design select kar sakein."
      },
      {
        "q": "Local support milta hai kya development ke liye?",
        "a": "Bilkul, humare team Tamil Nadu me hai aur hum Tamil/Hinglish dono me guide karte hain. Aapko har step par local help milegi."
      }
    ]
  },
  {
    "key": "varanasi",
    "name": "Varanasi",
    "niche": "Banarasi Silk",
    "hook": "India's Silk Legacy Capital",
    "hinglishHook": "Varanasi me apni dukaan online kaise le jayein?",
    "localProblem": "Varanasi ke Vishwanath Gali aur Godowlia ke Banarasi silk weavers traditional export challenges aur local reach na hone se pareshaan hain. ReadyFlow unhe easy aur effective Shopify solution deta hai.",
    "brokenKeywords": "shopify varanasi, banarasi website varanasi, saste me dukaan online, varanasi me website banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Varanasi was once the shining epicenter of India’s silk legacy, with thousands of looms producing Banarasi sarees. The local saree industry is estimated at around ₹600 crore annually, highlighting huge potential for weavers to reach customers via online channels.",
    "industryPoint": "Custom design uploads and high-definition product imagery for luxury sarees.",
    "landmarks": "Chowk, Vishwanath Temple, Godowlia, Madanpura",
    "keywords": "Shopify developer Varanasi, Banarasi saree ecommerce, Varanasi D2C expert",
    "faqs": [
      {
        "q": "Varanasi ke weavers apni saree website kaise start karenge?",
        "a": "ReadyFlow aapke liye Shopify store banata hai jisme hum Banarasi sarees ki high-res photos aur custom descriptions add karte hain. Aap bas orders fulfill karen, saara technical kaam hum sambhalte hain."
      },
      {
        "q": "Payment integration kaise hogi, kya UPI aur wallet bhi chalega?",
        "a": "Hum aapke store mein BharatPay, UPI aur popular wallets integrate kar denge. Isse Varanasi ke customer araam se online payment kar sakte hain."
      },
      {
        "q": "Shipping ke liye best kya hoga agar destination door ho?",
        "a": "Weight-based shipping rules lagaye jaate hain aur nationwide couriers connect karte hain. Aapke customers ko transparent tracking aur timely delivery milegi."
      }
    ]
  },
  {
    "key": "kanchipuram",
    "name": "Kanchipuram",
    "niche": "Silk Sarees",
    "hook": "Tamil Nadu's Silk Weaving Capital",
    "hinglishHook": "Kanchipuram me apni pattu dukaan online kaise le jayein?",
    "localProblem": "Kanchipuram ke Vishweshwarapuram aur Koovam ke silk weavers ko shipping aur design updates nahi mil paate. ReadyFlow unko ekdam customized Shopify store ke saath global reach provide karta hai.",
    "brokenKeywords": "shopify kanchipuram, pattu website kanchipuram, saste me dukaan online, kanchipuram me website banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Kanchipuram is often called 'Silk City', with almost all of the town’s economy centered on its handwoven silk sarees. It has around 60,000 looms and over ₹200 crore in annual sales, making it a prime region for bringing traditional saree businesses online.",
    "industryPoint": "Product bundles for saree-plus-blouse and multi-variant color/pattern selections for silk sarees.",
    "landmarks": "Ekambareswarar Temple, Varadaraja Swamy Temple, Koovam, Vishweshwarapuram",
    "keywords": "Shopify developer Kanchipuram, Kanjeevaram saree online, Tamil Nadu silk D2C",
    "faqs": [
      {
        "q": "Kanchipuram me silk saree online store kitne din me bana sakte hain?",
        "a": "ReadyFlow kuch hi dinon me aapka Shopify store launch karke deta hai. Aapko sirf products ki photos aur descriptions humko deni hai, baaki hum design aur backend sambhalenge."
      },
      {
        "q": "Blouse ke sath saree bundling possible hai kya?",
        "a": "Bilkul, hum saree ko matching blouse piece ke sath bundle kar sakte hain. Is feature se aap customers ko puri dress set ek saath bech sakte hain."
      },
      {
        "q": "Payment me Tamil support hai kya?",
        "a": "Haan, aap store me Tamil ya English me content rakh sakte hain. Customers Tamil me commands aur details dekh sakenge, kyunki hum local language me content management karte hain."
      }
    ]
  },
  {
    "key": "mysore",
    "name": "Mysore",
    "niche": "Silk & Sandalwood",
    "hook": "Karnataka's Silk & Sandalwood Hub",
    "hinglishHook": "Mysore me apni silk dukaan online kaise le jayein?",
    "localProblem": "Mysore ke Devaraja Market aur Gokulam ke silk weavers aur sandalwood traders limited local reach aur manual processes se pareshaan hain. ReadyFlow unke liye specialized Shopify solutions lekar aata hai.",
    "brokenKeywords": "shopify mysore, website in mysore, saste me dukaan online, mysore me website banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Mysore is famed for its luxurious silk sarees and sandalwood handicrafts. This combination of textiles and aromatic wood products gives local businesses strong potential to expand via online retail channels.",
    "industryPoint": "Product bundles (saree+blouse, sandalwood incense sets) and multi-lingual support for local Kannada-speaking customers.",
    "landmarks": "Devaraja Market, Mysore Palace, Kukkarahalli Lake, Gokulam",
    "keywords": "Shopify developer Mysore, Mysore silk ecommerce, Karnataka handicrafts online",
    "faqs": [
      {
        "q": "Mysore me silks aur sandalwood ka online dukaan kase chalu karein?",
        "a": "ReadyFlow apka Shopify store create karega jisme ham Mysore-specific products jaise silks aur sandalwood items list karenge. Aapko sirf products aur local language (Kannada/Hindi) content dena hoga, baki tech hum sambhlenge."
      },
      {
        "q": "Shipping Kis rate Se karein, Mysore se door cities tak kitna?",
        "a": "Ham weight-based shipping integrate karte hai aur Karnataka Courier network se partner karte hain. Is tarah Mysore se door cities tak bhi sahi rate par shipments chaliye."
      },
      {
        "q": "Customer support aur language kaisa milega?",
        "a": "Hamare local support team English, Hindi, Kannada sab me help karti hai. Aap Kannada me commands use kar sakte hain aur site me content bhi Kannada me dal sakte hain."
      }
    ]
  },
  {
    "key": "amritsar",
    "name": "Amritsar",
    "niche": "Phulkari & Textiles",
    "hook": "Punjab's Phulkari Capital",
    "hinglishHook": "Amritsar me apni phulkari dukaan online kaise le jayein?",
    "localProblem": "Amritsar ke Hall Bazaar aur Guru Bazaar ke phulkari artisans aur kapde ke vyapari online marketing aur logistic support ki kami se pareshaan hain. ReadyFlow unke liye mobile-friendly Shopify stores taiyar karta hai.",
    "brokenKeywords": "shopify amritsar, website in amritsar, saste me dukaan online, amritsar me website banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Amritsar is known for traditional Phulkari embroidery and robust textile businesses. Its skilled artisans and historic markets around the Golden Temple provide strong potential for local craftspeople to grow via online retail.",
    "industryPoint": "Custom embroidery pattern builder and multi-lingual (Punjabi/Hindi) storefront support.",
    "landmarks": "Golden Temple, Hall Bazaar, Guru Bazaar, Kapda Bazar",
    "keywords": "Shopify developer Amritsar, Phulkari online store, Punjab textile expert",
    "faqs": [
      {
        "q": "Amritsar wale kise videshi crafts ka dukaan online kiven start karange?",
        "a": "ReadyFlow tuhade layi Shopify store banauga, jithe asin Punjabi/Hindi vich product details add kariye te secure payment integrate kariye, taaki Amritsar de kalaakaar international buyers tak pahunch saken."
      },
      {
        "q": "Local shipping te packaging layi ki arrangement hoyega?",
        "a": "Asi heavy and fragile items de layi vishesh packaging setup karange. Asi weight-base shipping rules set karde haan, taki delivery chte and surakhshit hove."
      },
      {
        "q": "Customers Punjabi vich search kar sake?",
        "a": "Haan, tuhade store ch Punjabi vich v product names te descriptions ho sakdi hain. E-commerce platform ch multi-language support hai, jis naal local bhasavaadi customers nu help milegi."
      }
    ]
  },
  {
    "key": "jalandhar",
    "name": "Jalandhar",
    "niche": "Sports Goods",
    "hook": "India's Sports Goods Hub",
    "hinglishHook": "Jalandhar me apni sports goods dukaan online kaise le jayein?",
    "localProblem": "Jalandhar ke Model Town aur Basti Danishmanda ke sports goods manufacturers ko inventory management aur global marketing ki chinta hai. ReadyFlow unko ek complete Shopify solution deta hai.",
    "brokenKeywords": "shopify jalandhar, sports website jalandhar, saste me dukaan online, jalandhar me website banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Jalandhar is India’s largest sports-goods manufacturing hub, known for producing everything from cricket bats and balls to hockey equipment. Its strong export-oriented industry suggests excellent potential for local sports businesses to expand online.",
    "industryPoint": "SKU-based inventory for multi-variant sports equipment and integrated bulk-order handling for team sports gear.",
    "landmarks": "Model Town, Basti Danishmanda, Kath Mandi, Railway Bazaar",
    "keywords": "Shopify developer Jalandhar, Sports equipment online, Punjab D2C expert",
    "faqs": [
      {
        "q": "Jalandhar wale sports dukaanwale online kivein start karange?",
        "a": "ReadyFlow tuhade layi Shopify store banauga, jithe asin products di list tay karange, categories banauge, te Punjabi/Hindi vich descriptions add karange. Asi saara technical setup sambhalange taaki tuhanu bechna aasan ho jave."
      },
      {
        "q": "Team orders layi bulk discounts set honge ki nahi?",
        "a": "Haan, asin bulk-order pricing features enable karangay. Tusi ek team diya uniform ya equipment packages same rate te set kar sakde ho."
      },
      {
        "q": "Local delivery schedule kiven manage karange?",
        "a": "Weight-based courier integration kar ke asin delivery schedule streamline karange. Is tarah, Jalandhar to distant cities tak orders timely pahunch jaange."
      }
    ]
  },
  {
    "key": "rajkot",
    "name": "Rajkot",
    "niche": "Jewelry & Auto Parts",
    "hook": "Gujarat's Jewelry & Auto Parts Hub",
    "hinglishHook": "Rajkot me apni jewelry dukaan online kaise le jayein?",
    "localProblem": "Rajkot ke Jivraj Park aur Indira Park ke jewellers aur auto parts vendors ko mukable se pareshani hoti hai. ReadyFlow unko turnkey Shopify solution deta hai jisse woh behtar tarike se apna online business chala saken.",
    "brokenKeywords": "shopify rajkot, website in rajkot, saste me dukaan online, rajkot me website banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Rajkot is known for its vibrant jewelry manufacturing (especially imitation jewelry) and auto parts industries. This blend of craftsmanship and engineering means local businesses have strong opportunities to grow by selling online.",
    "industryPoint": "Customizable product filters for jewelry (like gemstone/metal) and part-number search for automotive components.",
    "landmarks": "Jivraj Park, Indira Park, Bagumara Chowk, Rajkot Airport",
    "keywords": "Shopify developer Rajkot, Rajkot jewelry ecommerce, Gujarat auto parts online",
    "faqs": [
      {
        "q": "Rajkot ke jewellers apni website kaise bana sakte hain?",
        "a": "ReadyFlow aapke liye Shopify store set karta hai, jisme aapki designs ki gallery aur categories banayi jaati hain. Aap apne hisab se filters (stone, metal) rakh sakte hain, taki customers asani se product choose kar saken."
      },
      {
        "q": "Auto parts dealers ki shipping kaise hoti hai?",
        "a": "Hum weight aur dimension ke basis par shipping configure karte hain aur trusted couriers se tie-up karte hain. Isse heavy parts bhi safe aur timely deliver hoti hai."
      },
      {
        "q": "Pricing aur currency conversion manage hoga?",
        "a": "Haan, hum multiple currency checkout set up kar sakte hain. Agar aap foreign customers ke saath deal karna chahein, to website unke currency mein price dikha sakti hai."
      }
    ]
  },
  {
    "key": "jodhpur",
    "name": "Jodhpur",
    "niche": "Furniture & Handicrafts",
    "hook": "Rajasthan's Handicraft Capital",
    "hinglishHook": "Jodhpur me apna furniture dukaan online kaise le jayein?",
    "localProblem": "Jodhpur ke Sojati Gate aur Nai Sarak ke furniture craftsmen ko global market tak pahunch aur packaging ki chinta hai. ReadyFlow unke liye ekdam professional Shopify store banata hai.",
    "brokenKeywords": "shopify jodhpur, website in jodhpur, saste me dukaan online, jodhpur me website banwana hai",
    "youtubeId": "dQw4w9WgXcQ",
    "description": "Jodhpur’s artisans create intricate wood furniture and crafts, and the city accounts for nearly 60% of Rajasthan’s handicraft exports. Its centuries-old heritage and export demand mean local makers have strong opportunities to sell globally via online channels.",
    "industryPoint": "Dimensional shipping and assembly guide integration for furniture, and rich media storytelling for handicrafts.",
    "landmarks": "Sojati Gate, Nai Sarak, Clock Tower, Umaid Bhawan Palace",
    "keywords": "Shopify developer Jodhpur, Jodhpur furniture ecommerce, Rajasthan craft D2C",
    "faqs": [
      {
        "q": "Jodhpur ke furniture waale kaise global buyers tak pahunch sakte hain?",
        "a": "ReadyFlow high-quality product listings taiyar karta hai, jisme furniture ki detailed images aur assembly guides shamil hote hain. Isse aapke products international buyers tak seedhe pahunch jate hain."
      },
      {
        "q": "Online store par shipments ki responsibility kiske upar hogi?",
        "a": "Hum aapko weight-based courier options aur packing partners connect karte hain. Aap agar chaho to local courier ka option de sakte ho, hum usko integration karke set kar denge."
      },
      {
        "q": "Handicraft items ke liye special promotion kaise hota hai?",
        "a": "Aap handcrafted items ke liye video/product story ya blog add kar sakte hain. ReadyFlow aapko aise storytelling features provide karega jisse craftsmanship dikhe."
      }
    ]
  }
];

// ============================================================
// LOGIC: Process Batch 2 (Convert Array -> Object)
// ============================================================
const processedBatch2 = batch2.reduce((acc, city) => {
  if(city.key) {
    acc[city.key] = city;
  }
  return acc;
}, {} as any);

// ============================================================
// FINAL EXPORT: Merge All Batches
// (Initial + Batch 1 + Batch 2)
// ============================================================
export const cities = {
  ...initialCities,
  ...processedNewCities, // Make sure this matches the variable name above for Batch 1
  ...processedBatch2
};


export const defaultLocation = {
    name: "India",
    niche: "E-commerce & D2C",
    hook: "India's Leading Shopify Expert",
    hinglishHook: "Apni dukaan ko online le jaana ab hua aasaan!",
    localProblem: "Aksar Indian business owners ko technical support aur high RTO ki chinta rehti hai. Hum globally proven strategies ko Indian market ke hisaab se implement karte hain.",
    brokenKeywords: "shopify developer india, website banwani hai, best ecommerce developer",
    youtubeId: "dQw4w9WgXcQ", 
    description: "We help brands across India build world-class Shopify stores with specialized focus on RTO reduction and high-conversion UI.",
    landmarks: "Delhi, Mumbai, Bangalore, Indore, Surat",
    keywords: "Shopify expert India, D2C store setup, eCommerce developer",
    faqs: [
      { q: "Do you serve clients outside major cities?", a: "Yes, we provide 100% remote support and setup for brands all over India." },
      { q: "How do we communicate during the project?", a: "We use WhatsApp and Zoom for all strategy calls and updates." }
    ]
};
