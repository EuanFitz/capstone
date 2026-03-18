//PEOPLE
// THIS WILL BE POPULATED VIA PHP
const employees = [
  // Company 1
  { company_id: 1, department_id: 3, name: 'James Carter', phone: '403-555-0101' },
  { company_id: 1, department_id: 2, name: 'Sarah Mitchell', phone: '403-555-0102' },
  { company_id: 1, department_id: 17, name: 'David Nguyen', phone: '403-555-0103' },
  { company_id: 1, department_id: 14, name: 'Emily Rhodes', phone: '403-555-0104' },
  { company_id: 1, department_id: 32, name: 'Marcus Bell', phone: '403-555-0105' },
  { company_id: 1, department_id: 13, name: 'Olivia Chen', phone: '403-555-0106' },
  { company_id: 1, department_id: 3, name: 'Tyler Brooks', phone: '403-555-0107' },
  { company_id: 1, department_id: 2, name: 'Hannah Flores', phone: '403-555-0108' },
  { company_id: 1, department_id: 17, name: 'Nathan Price', phone: '403-555-0109' },
  { company_id: 1, department_id: 14, name: 'Chloe Warren', phone: '403-555-0110' },
  // Company 2
  { company_id: 2, department_id: 3, name: 'Ethan Scott', phone: '403-555-0111' },
  { company_id: 2, department_id: 6, name: 'Ava Turner', phone: '403-555-0112' },
  { company_id: 2, department_id: 9, name: 'Logan Murphy', phone: '403-555-0113' },
  { company_id: 2, department_id: 13, name: 'Isabella Reed', phone: '403-555-0114' },
  { company_id: 2, department_id: 18, name: 'Ryan Cooper', phone: '403-555-0115' },
  { company_id: 2, department_id: 31, name: 'Sophia Barnes', phone: '403-555-0116' },
  { company_id: 2, department_id: 2, name: 'Jackson Hayes', phone: '403-555-0117' },
  { company_id: 2, department_id: 6, name: 'Mia Simmons', phone: '403-555-0118' },
  { company_id: 2, department_id: 9, name: 'Caleb Foster', phone: '403-555-0119' },
  { company_id: 2, department_id: 13, name: 'Lily Griffith', phone: '403-555-0120' },
  // Company 3
  { company_id: 3, department_id: 3, name: 'Owen Sanders', phone: '403-555-0121' },
  { company_id: 3, department_id: 6, name: 'Grace Kim', phone: '403-555-0122' },
  { company_id: 3, department_id: 11, name: 'Liam Hughes', phone: '403-555-0123' },
  { company_id: 3, department_id: 31, name: 'Ella Patterson', phone: '403-555-0124' },
  { company_id: 3, department_id: 2, name: 'Noah Jenkins', phone: '403-555-0125' },
  { company_id: 3, department_id: 6, name: 'Avery Morgan', phone: '403-555-0126' },
  { company_id: 3, department_id: 11, name: 'Mason Perry', phone: '403-555-0127' },
  { company_id: 3, department_id: 3, name: 'Harper Powell', phone: '403-555-0128' },
  { company_id: 3, department_id: 31, name: 'Lucas Russell', phone: '403-555-0129' },
  { company_id: 3, department_id: 2, name: 'Aria Coleman', phone: '403-555-0130' },
  // Company 4
  { company_id: 4, department_id: 3, name: 'Elijah Rivera', phone: '403-555-0131' },
  { company_id: 4, department_id: 10, name: 'Scarlett Ward', phone: '403-555-0132' },
  { company_id: 4, department_id: 11, name: 'Benjamin Torres', phone: '403-555-0133' },
  { company_id: 4, department_id: 29, name: 'Victoria Ramirez', phone: '403-555-0134' },
  { company_id: 4, department_id: 30, name: 'Henry Peterson', phone: '403-555-0135' },
  { company_id: 4, department_id: 2, name: 'Nora Gray', phone: '403-555-0136' },
  { company_id: 4, department_id: 10, name: 'Alexander James', phone: '403-555-0137' },
  { company_id: 4, department_id: 11, name: 'Luna Watson', phone: '403-555-0138' },
  { company_id: 4, department_id: 29, name: 'Daniel Brooks', phone: '403-555-0139' },
  { company_id: 4, department_id: 30, name: 'Zoe Kelly', phone: '403-555-0140' },
  // Company 5
  { company_id: 5, department_id: 3, name: 'Jack Murphy', phone: '403-555-0141' },
  { company_id: 5, department_id: 4, name: 'Penelope Cox', phone: '403-555-0142' },
  { company_id: 5, department_id: 23, name: 'Sebastian Rivera', phone: '403-555-0143' },
  { company_id: 5, department_id: 28, name: 'Layla Richardson', phone: '403-555-0144' },
  { company_id: 5, department_id: 2, name: 'Matthew Wood', phone: '403-555-0145' },
  { company_id: 5, department_id: 4, name: 'Stella Diaz', phone: '403-555-0146' },
  { company_id: 5, department_id: 23, name: 'Aiden Hughes', phone: '403-555-0147' },
  { company_id: 5, department_id: 28, name: 'Violet Reyes', phone: '403-555-0148' },
  { company_id: 5, department_id: 3, name: 'Julian Price', phone: '403-555-0149' },
  { company_id: 5, department_id: 2, name: 'Aurora Campbell', phone: '403-555-0150' },
  // Company 6
  { company_id: 6, department_id: 3, name: 'Grayson Mitchell', phone: '403-555-0151' },
  { company_id: 6, department_id: 12, name: 'Bella Parker', phone: '403-555-0152' },
  { company_id: 6, department_id: 19, name: 'Colton Evans', phone: '403-555-0153' },
  { company_id: 6, department_id: 22, name: 'Samantha Edwards', phone: '403-555-0154' },
  { company_id: 6, department_id: 2, name: 'Dominic Collins', phone: '403-555-0155' },
  { company_id: 6, department_id: 12, name: 'Naomi Stewart', phone: '403-555-0156' },
  { company_id: 6, department_id: 19, name: 'Brayden Morris', phone: '403-555-0157' },
  { company_id: 6, department_id: 22, name: 'Leah Rogers', phone: '403-555-0158' },
  { company_id: 6, department_id: 3, name: 'Isaiah Cook', phone: '403-555-0159' },
  { company_id: 6, department_id: 2, name: 'Madeline Morgan', phone: '403-555-0160' },
  // Company 7
  { company_id: 7, department_id: 3, name: 'Evan Bell', phone: '403-555-0161' },
  { company_id: 7, department_id: 5, name: 'Claire Murphy', phone: '403-555-0162' },
  { company_id: 7, department_id: 11, name: 'Connor Bailey', phone: '403-555-0163' },
  { company_id: 7, department_id: 12, name: 'Peyton Rivera', phone: '403-555-0164' },
  { company_id: 7, department_id: 2, name: 'Gavin Cooper', phone: '403-555-0165' },
  { company_id: 7, department_id: 5, name: 'Audrey Richardson', phone: '403-555-0166' },
  { company_id: 7, department_id: 11, name: 'Hunter Cox', phone: '403-555-0167' },
  { company_id: 7, department_id: 12, name: 'Paisley Howard', phone: '403-555-0168' },
  { company_id: 7, department_id: 3, name: 'Landon Ward', phone: '403-555-0169' },
  { company_id: 7, department_id: 2, name: 'Brooklyn James', phone: '403-555-0170' },
  // Company 8
  { company_id: 8, department_id: 3, name: 'Jaxon Torres', phone: '403-555-0171' },
  { company_id: 8, department_id: 19, name: 'Savannah Long', phone: '403-555-0172' },
  { company_id: 8, department_id: 25, name: 'Bryson Sanders', phone: '403-555-0173' },
  { company_id: 8, department_id: 28, name: 'Aaliyah Foster', phone: '403-555-0174' },
  { company_id: 8, department_id: 29, name: 'Camden Price', phone: '403-555-0175' },
  { company_id: 8, department_id: 2, name: 'Reagan Hughes', phone: '403-555-0176' },
  { company_id: 8, department_id: 19, name: 'Easton Barnes', phone: '403-555-0177' },
  { company_id: 8, department_id: 25, name: 'Kinsley Powell', phone: '403-555-0178' },
  { company_id: 8, department_id: 28, name: 'Weston Gray', phone: '403-555-0179' },
  { company_id: 8, department_id: 29, name: 'Mackenzie Ross', phone: '403-555-0180' },
  // Company 9
  { company_id: 9, department_id: 3, name: 'Sawyer Jenkins', phone: '403-555-0181' },
  { company_id: 9, department_id: 15, name: 'Addison Perry', phone: '403-555-0182' },
  { company_id: 9, department_id: 17, name: 'Greyson Coleman', phone: '403-555-0183' },
  { company_id: 9, department_id: 2, name: 'Hadley Russell', phone: '403-555-0184' },
  { company_id: 9, department_id: 15, name: 'Beckett Watson', phone: '403-555-0185' },
  { company_id: 9, department_id: 17, name: 'Piper Hayes', phone: '403-555-0186' },
  { company_id: 9, department_id: 3, name: 'Knox Patterson', phone: '403-555-0187' },
  { company_id: 9, department_id: 2, name: 'Emery Simmons', phone: '403-555-0188' },
  { company_id: 9, department_id: 15, name: 'Rhett Turner', phone: '403-555-0189' },
  { company_id: 9, department_id: 17, name: 'Briar Scott', phone: '403-555-0190' },
  // Company 10
  { company_id: 10, department_id: 3, name: 'Crew Mitchell', phone: '403-555-0191' },
  { company_id: 10, department_id: 9, name: 'Sloane Cooper', phone: '403-555-0192' },
  { company_id: 10, department_id: 17, name: 'Archer Evans', phone: '403-555-0193' },
  { company_id: 10, department_id: 24, name: 'Waverly Morris', phone: '403-555-0194' },
  { company_id: 10, department_id: 2, name: 'Bowen Rogers', phone: '403-555-0195' },
  { company_id: 10, department_id: 9, name: 'Presley Cook', phone: '403-555-0196' },
  { company_id: 10, department_id: 17, name: 'Blaine Stewart', phone: '403-555-0197' },
  { company_id: 10, department_id: 24, name: 'Haven Edwards', phone: '403-555-0198' },
  { company_id: 10, department_id: 3, name: 'Zane Collins', phone: '403-555-0199' },
  { company_id: 10, department_id: 2, name: 'Blythe Bailey', phone: '403-555-0200' },
  // Company 11
  { company_id: 11, department_id: 3, name: 'Ledger Parker', phone: '403-555-0201' },
  { company_id: 11, department_id: 9, name: 'Lena Howard', phone: '403-555-0202' },
  { company_id: 11, department_id: 25, name: 'Ford Long', phone: '403-555-0203' },
  { company_id: 11, department_id: 32, name: 'Cora Ward', phone: '403-555-0204' },
  { company_id: 11, department_id: 2, name: 'Ridge James', phone: '403-555-0205' },
  { company_id: 11, department_id: 9, name: 'Ivy Torres', phone: '403-555-0206' },
  { company_id: 11, department_id: 25, name: 'Cash Rivera', phone: '403-555-0207' },
  { company_id: 11, department_id: 32, name: 'Rue Sanders', phone: '403-555-0208' },
  { company_id: 11, department_id: 3, name: 'Jett Foster', phone: '403-555-0209' },
  { company_id: 11, department_id: 2, name: 'Wren Price', phone: '403-555-0210' },
  // Company 12
  { company_id: 12, department_id: 3, name: 'Sage Hughes', phone: '403-555-0211' },
  { company_id: 12, department_id: 13, name: 'Beau Powell', phone: '403-555-0212' },
  { company_id: 12, department_id: 25, name: 'Fern Gray', phone: '403-555-0213' },
  { company_id: 12, department_id: 29, name: 'Remy Ross', phone: '403-555-0214' },
  { company_id: 12, department_id: 2, name: 'Lake Jenkins', phone: '403-555-0215' },
  { company_id: 12, department_id: 13, name: 'Dove Perry', phone: '403-555-0216' },
  { company_id: 12, department_id: 25, name: 'Stone Coleman', phone: '403-555-0217' },
  { company_id: 12, department_id: 29, name: 'Rain Watson', phone: '403-555-0218' },
  { company_id: 12, department_id: 3, name: 'Birch Hayes', phone: '403-555-0219' },
  { company_id: 12, department_id: 2, name: 'Snow Patterson', phone: '403-555-0220' },
  // Company 13
  { company_id: 13, department_id: 3, name: 'Wolf Simmons', phone: '403-555-0221' },
  { company_id: 13, department_id: 21, name: 'Faye Turner', phone: '403-555-0222' },
  { company_id: 13, department_id: 28, name: 'Reed Scott', phone: '403-555-0223' },
  { company_id: 13, department_id: 29, name: 'Lark Cooper', phone: '403-555-0224' },
  { company_id: 13, department_id: 2, name: 'Bay Evans', phone: '403-555-0225' },
  { company_id: 13, department_id: 21, name: 'Moss Morris', phone: '403-555-0226' },
  { company_id: 13, department_id: 28, name: 'Willa Rogers', phone: '403-555-0227' },
  { company_id: 13, department_id: 29, name: 'Clay Cook', phone: '403-555-0228' },
  { company_id: 13, department_id: 3, name: 'Fawn Stewart', phone: '403-555-0229' },
  { company_id: 13, department_id: 2, name: 'Brooks Edwards', phone: '403-555-0230' },
  // Company 14
  { company_id: 14, department_id: 3, name: 'Drift Collins', phone: '403-555-0231' },
  { company_id: 14, department_id: 9, name: 'Sloan Bailey', phone: '403-555-0232' },
  { company_id: 14, department_id: 20, name: 'North Rivera', phone: '403-555-0233' },
  { company_id: 14, department_id: 29, name: 'Wren Howard', phone: '403-555-0234' },
  { company_id: 14, department_id: 2, name: 'Colt Long', phone: '403-555-0235' },
  { company_id: 14, department_id: 9, name: 'Fern Ward', phone: '403-555-0236' },
  { company_id: 14, department_id: 20, name: 'Sage James', phone: '403-555-0237' },
  { company_id: 14, department_id: 29, name: 'Ash Torres', phone: '403-555-0238' },
  { company_id: 14, department_id: 3, name: 'Bree Sanders', phone: '403-555-0239' },
  { company_id: 14, department_id: 2, name: 'Lane Foster', phone: '403-555-0240' },
  // Company 15
  { company_id: 15, department_id: 3, name: 'Drew Price', phone: '403-555-0241' },
  { company_id: 15, department_id: 13, name: 'Blair Hughes', phone: '403-555-0242' },
  { company_id: 15, department_id: 21, name: 'Chase Powell', phone: '403-555-0243' },
  { company_id: 15, department_id: 25, name: 'Quinn Gray', phone: '403-555-0244' },
  { company_id: 15, department_id: 2, name: 'Reese Ross', phone: '403-555-0245' },
  { company_id: 15, department_id: 13, name: 'Tatum Jenkins', phone: '403-555-0246' },
  { company_id: 15, department_id: 21, name: 'Hayden Perry', phone: '403-555-0247' },
  { company_id: 15, department_id: 25, name: 'Morgan Coleman', phone: '403-555-0248' },
  { company_id: 15, department_id: 3, name: 'Avery Watson', phone: '403-555-0249' },
  { company_id: 15, department_id: 2, name: 'Jordan Hayes', phone: '403-555-0250' },
  // Company 16
  { company_id: 16, department_id: 3, name: 'Parker Patterson', phone: '403-555-0251' },
  { company_id: 16, department_id: 5, name: 'Finley Simmons', phone: '403-555-0252' },
  { company_id: 16, department_id: 17, name: 'Rowan Turner', phone: '403-555-0253' },
  { company_id: 16, department_id: 25, name: 'Skylar Scott', phone: '403-555-0254' },
  { company_id: 16, department_id: 28, name: 'River Cooper', phone: '403-555-0255' },
  { company_id: 16, department_id: 2, name: 'Emerson Evans', phone: '403-555-0256' },
  { company_id: 16, department_id: 5, name: 'Casey Morris', phone: '403-555-0257' },
  { company_id: 16, department_id: 17, name: 'Taylor Rogers', phone: '403-555-0258' },
  { company_id: 16, department_id: 25, name: 'Riley Cook', phone: '403-555-0259' },
  { company_id: 16, department_id: 28, name: 'Sage Stewart', phone: '403-555-0260' },
  // Company 17
  { company_id: 17, department_id: 3, name: 'Dallas Edwards', phone: '403-555-0261' },
  { company_id: 17, department_id: 13, name: 'Harlow Collins', phone: '403-555-0262' },
  { company_id: 17, department_id: 16, name: 'Spencer Bailey', phone: '403-555-0263' },
  { company_id: 17, department_id: 18, name: 'Lennon Rivera', phone: '403-555-0264' },
  { company_id: 17, department_id: 2, name: 'Oakley Howard', phone: '403-555-0265' },
  { company_id: 17, department_id: 13, name: 'Sutton Long', phone: '403-555-0266' },
  { company_id: 17, department_id: 16, name: 'Remy Ward', phone: '403-555-0267' },
  { company_id: 17, department_id: 18, name: 'Marlow James', phone: '403-555-0268' },
  { company_id: 17, department_id: 3, name: 'Bellamy Torres', phone: '403-555-0269' },
  { company_id: 17, department_id: 2, name: 'Sailor Sanders', phone: '403-555-0270' },
  // Company 18
  { company_id: 18, department_id: 3, name: 'Wilder Foster', phone: '403-555-0271' },
  { company_id: 18, department_id: 8, name: 'Lyric Price', phone: '403-555-0272' },
  { company_id: 18, department_id: 18, name: 'Onyx Hughes', phone: '403-555-0273' },
  { company_id: 18, department_id: 26, name: 'Pax Powell', phone: '403-555-0274' },
  { company_id: 18, department_id: 2, name: 'Zephyr Gray', phone: '403-555-0275' },
  { company_id: 18, department_id: 8, name: 'Indigo Ross', phone: '403-555-0276' },
  { company_id: 18, department_id: 18, name: 'Cedar Jenkins', phone: '403-555-0277' },
  { company_id: 18, department_id: 26, name: 'Juniper Perry', phone: '403-555-0278' },
  { company_id: 18, department_id: 3, name: 'Caspian Coleman', phone: '403-555-0279' },
  { company_id: 18, department_id: 2, name: 'Soleil Watson', phone: '403-555-0280' },
  // Company 19
  { company_id: 19, department_id: 3, name: 'Atlas Hayes', phone: '403-555-0281' },
  { company_id: 19, department_id: 9, name: 'Ember Patterson', phone: '403-555-0282' },
  { company_id: 19, department_id: 18, name: 'Rune Simmons', phone: '403-555-0283' },
  { company_id: 19, department_id: 27, name: 'Lumen Turner', phone: '403-555-0284' },
  { company_id: 19, department_id: 2, name: 'Sable Scott', phone: '403-555-0285' },
  { company_id: 19, department_id: 9, name: 'Frost Cooper', phone: '403-555-0286' },
  { company_id: 19, department_id: 18, name: 'Blaze Evans', phone: '403-555-0287' },
  { company_id: 19, department_id: 27, name: 'Storm Morris', phone: '403-555-0288' },
  { company_id: 19, department_id: 3, name: 'Tide Rogers', phone: '403-555-0289' },
  { company_id: 19, department_id: 2, name: 'Flint Cook', phone: '403-555-0290' },
  // Company 20
  { company_id: 20, department_id: 3, name: 'Dune Stewart', phone: '403-555-0291' },
  { company_id: 20, department_id: 12, name: 'Fable Edwards', phone: '403-555-0292' },
  { company_id: 20, department_id: 23, name: 'Crest Collins', phone: '403-555-0293' },
  { company_id: 20, department_id: 2, name: 'Gale Bailey', phone: '403-555-0294' },
  { company_id: 20, department_id: 12, name: 'Haze Rivera', phone: '403-555-0295' },
  { company_id: 20, department_id: 23, name: 'Mist Howard', phone: '403-555-0296' },
  { company_id: 20, department_id: 3, name: 'Vale Long', phone: '403-555-0297' },
  { company_id: 20, department_id: 2, name: 'Dell Ward', phone: '403-555-0298' },
  { company_id: 20, department_id: 12, name: 'Glen James', phone: '403-555-0299' },
  { company_id: 20, department_id: 23, name: 'Fen Torres', phone: '403-555-0300' },
  // Company 21
  { company_id: 21, department_id: 3, name: 'Crag Sanders', phone: '403-555-0301' },
  { company_id: 21, department_id: 5, name: 'Brae Foster', phone: '403-555-0302' },
  { company_id: 21, department_id: 6, name: 'Rill Price', phone: '403-555-0303' },
  { company_id: 21, department_id: 11, name: 'Tor Hughes', phone: '403-555-0304' },
  { company_id: 21, department_id: 2, name: 'Cove Powell', phone: '403-555-0305' },
  { company_id: 21, department_id: 5, name: 'Beck Gray', phone: '403-555-0306' },
  { company_id: 21, department_id: 6, name: 'Dale Ross', phone: '403-555-0307' },
  { company_id: 21, department_id: 11, name: 'Firth Jenkins', phone: '403-555-0308' },
  { company_id: 21, department_id: 3, name: 'Holm Perry', phone: '403-555-0309' },
  { company_id: 21, department_id: 2, name: 'Mere Coleman', phone: '403-555-0310' },
  // Company 22
  { company_id: 22, department_id: 3, name: 'Pike Watson', phone: '403-555-0311' },
  { company_id: 22, department_id: 8, name: 'Wold Hayes', phone: '403-555-0312' },
  { company_id: 22, department_id: 23, name: 'Fen Patterson', phone: '403-555-0313' },
  { company_id: 22, department_id: 28, name: 'Moor Simmons', phone: '403-555-0314' },
  { company_id: 22, department_id: 31, name: 'Lea Turner', phone: '403-555-0315' },
  { company_id: 22, department_id: 2, name: 'Weald Scott', phone: '403-555-0316' },
  { company_id: 22, department_id: 8, name: 'Holt Cooper', phone: '403-555-0317' },
  { company_id: 22, department_id: 23, name: 'Shaw Evans', phone: '403-555-0318' },
  { company_id: 22, department_id: 28, name: 'Grove Morris', phone: '403-555-0319' },
  { company_id: 22, department_id: 31, name: 'Knoll Rogers', phone: '403-555-0320' },
  // Company 23
  { company_id: 23, department_id: 3, name: 'Bluff Cook', phone: '403-555-0321' },
  { company_id: 23, department_id: 13, name: 'Cliff Stewart', phone: '403-555-0322' },
  { company_id: 23, department_id: 26, name: 'Mesa Edwards', phone: '403-555-0323' },
  { company_id: 23, department_id: 32, name: 'Butte Collins', phone: '403-555-0324' },
  { company_id: 23, department_id: 2, name: 'Ridge Bailey', phone: '403-555-0325' },
  { company_id: 23, department_id: 13, name: 'Peak Rivera', phone: '403-555-0326' },
  { company_id: 23, department_id: 26, name: 'Spire Howard', phone: '403-555-0327' },
  { company_id: 23, department_id: 32, name: 'Crest Long', phone: '403-555-0328' },
  { company_id: 23, department_id: 3, name: 'Summit Ward', phone: '403-555-0329' },
  { company_id: 23, department_id: 2, name: 'Apex James', phone: '403-555-0330' },
  // Company 24
  { company_id: 24, department_id: 3, name: 'Canyon Torres', phone: '403-555-0331' },
  { company_id: 24, department_id: 10, name: 'Delta Sanders', phone: '403-555-0332' },
  { company_id: 24, department_id: 11, name: 'Sierra Foster', phone: '403-555-0333' },
  { company_id: 24, department_id: 29, name: 'Ravine Price', phone: '403-555-0334' },
  { company_id: 24, department_id: 2, name: 'Gorge Hughes', phone: '403-555-0335' },
  { company_id: 24, department_id: 10, name: 'Fjord Powell', phone: '403-555-0336' },
  { company_id: 24, department_id: 11, name: 'Basin Gray', phone: '403-555-0337' },
  { company_id: 24, department_id: 29, name: 'Hollow Ross', phone: '403-555-0338' },
  { company_id: 24, department_id: 3, name: 'Cavern Jenkins', phone: '403-555-0339' },
  { company_id: 24, department_id: 2, name: 'Grotto Perry', phone: '403-555-0340' },
];
// Select All
document.querySelector('.select-all').addEventListener('click', function(e) {
  e.preventDefault();
  const checkboxes = document.querySelectorAll('#recipient-list input[type="checkbox"]');
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);
  checkboxes.forEach(cb => cb.checked = !allChecked);
});

const list = document.querySelector('.select-list');
const listIcon = document.querySelector(".department-header svg");
// Department dropdown
document.querySelector('.department-header').addEventListener('click', function() {
  list.style.display = list.style.display === 'flex' ? 'none' : 'flex';
  listIcon.style.transform = listIcon.style.transform === 'rotate(90deg)' ? 'rotate(0deg)' : 'rotate(90deg)';
});

// Close when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('#department')) {
    list.style.display = 'none';
  }
});


//FILTER EMPLOYEES
const companyId = 15;
const company15Employees = employees.filter(emp => emp.company_id === companyId);

// Get unique department ids for company 15
const departments = [...new Set(company15Employees.map(emp => emp.department_id))];

// Populate the department list
const selectList = document.querySelector('.select-list');
selectList.innerHTML = '<li data-dept="all">All</li>';

departments.forEach(function(dept) {
  const li = document.createElement('li');
  li.textContent = dept;
  li.dataset.dept = dept;
  selectList.appendChild(li);
});

// Filter function
function renderEmployees(deptFilter) {
  const filtered = deptFilter === 'all'
    ? company15Employees
    : company15Employees.filter(emp => emp.department_id === deptFilter);

  const tbody = document.getElementById('recipient-list');
  tbody.innerHTML = '';

  filtered.forEach(function(emp) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.department_id}</td>
      <td><input type="checkbox" name="recipients" value="${emp.phone}" data-dept="${emp.department_id}" /></td>
    `;
    tbody.appendChild(row);
  });
}

// Initial render
renderEmployees('all');

// Department click filter
selectList.addEventListener('click', function(e) {
  const li = e.target.closest('li');
  if (!li) return;

  const dept = li.dataset.dept === 'all' ? 'all' : Number(li.dataset.dept);
  renderEmployees(dept);

  selectList.style.display = 'none';
  document.querySelector('.department-header svg').style.transform = 'rotate(0deg)';
});