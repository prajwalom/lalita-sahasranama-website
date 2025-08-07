-- Insert sample Sahasranama verses
INSERT INTO sahasranama_verses (verse_number, sanskrit, transliteration, english, hindi, meaning, detailed_commentary) VALUES
(1, 'श्री माता श्री महाराज्ञी श्रीमत्सिंहासनेश्वरी।
चिदग्निकुण्डसम्भूता देवकार्यसमुद्यता॥', 
'Shri mata shri maharajni shrimat simhasaneshwari |
Chidagnikunda sambhuta deva karya samudyata ||',
'The Divine Mother, the Great Queen, the Goddess of the magnificent throne,
Born from the fire-pit of consciousness, ever ready for divine work.',
'दिव्य माता, महान रानी, भव्य सिंहासन की देवी,
चेतना की अग्निकुंड से जन्मी, दिव्य कार्य के लिए सदा तत्पर।',
'This opening verse establishes the Divine Mother as the supreme ruler who emerged from pure consciousness to fulfill cosmic duties.',
'The first verse of Lalita Sahasranama introduces us to the Divine Mother in Her supreme aspect. She is Shri Mata (the auspicious mother), Shri Maharajni (the great queen), and Shrimat Simhasaneshwari (the goddess of the magnificent throne). The verse describes Her origin from Chidagnikunda (the fire-pit of consciousness) and Her eternal readiness for divine work (deva karya samudyata).'),

(2, 'उद्यद्भानुसहस्राभा चतुर्बाहुसमन्विता।
रागस्वरूपपाशाढ्या क्रोधाकारांकुशोज्ज्वला॥',
'Udyad bhanu sahasrabha chaturbahu samanvita |
Raga svarupa pashaDhya krodhakaran kushojjvala ||',
'Radiant as a thousand rising suns, endowed with four arms,
Holding the noose of attachment and the goad of anger bright.',
'हजार उदीयमान सूर्यों के समान तेजस्वी, चार भुजाओं से युक्त,
राग रूपी पाश और क्रोध रूपी अंकुश से शोभित।',
'This verse describes Her luminous form and the divine weapons She holds to guide devotees on the spiritual path.',
'The second verse describes the radiant form of the Divine Mother. She shines with the brilliance of a thousand rising suns (udyad bhanu sahasrabha) and has four arms (chaturbahu samanvita). She holds the noose of attachment (raga svarupa pasha) and the goad of righteous anger (krodhakara ankusha), representing Her power to bind devotees with love and guide them with divine discipline.'),

(3, 'मनोरूपेक्षुकोदण्डा पञ्चतन्मात्रसायका।
निजारुणप्रभापूरमज्जद्ब्रह्माण्डमण्डला॥',
'Mano rupekshu kodanda pancha tanmatra sayaka |
Nijaruna prabha pura majjad brahmanda mandala ||',
'Holding the sugarcane bow of mind, with five arrows of subtle elements,
The entire universe is immersed in Her rosy radiant light.',
'मन रूपी ईख के धनुष को धारण करने वाली, पांच तन्मात्राओं के बाण वाली,
जिसके अरुण प्रकाश में संपूर्ण ब्रह्मांड मंडल डूबा हुआ है।',
'Her divine weapons represent the subtle forces that govern creation, and Her radiance pervades all existence.',
'The third verse reveals the Divine Mother''s cosmic weapons and influence. She holds the bow made of mind (mano rupa ikshu kodanda) and five arrows representing the subtle elements (pancha tanmatra sayaka). Her rosy radiance (nijaruna prabha) pervades the entire universe (brahmanda mandala), indicating Her all-pervasive presence and power over both the subtle and gross aspects of creation.');

-- Link names to verses (this connects the individual names to their respective verses)
INSERT INTO verse_names (verse_id, name_id, position_in_verse) VALUES
-- Verse 1 names
(1, 1, 1), -- श्री माता
(1, 2, 2), -- श्री महाराज्ञी  
(1, 3, 3), -- श्रीमत्सिंहासनेश्वरी
(1, 4, 4), -- चिदग्निकुण्डसम्भूता
(1, 5, 5); -- देवकार्यसमुद्यता

-- Note: You would continue this pattern for all verses and their corresponding names
-- The position_in_verse indicates the order of names within each verse
