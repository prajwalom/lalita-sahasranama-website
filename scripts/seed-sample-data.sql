-- Insert sample sacred names data
INSERT INTO sacred_names (number, sanskrit, transliteration, english, hindi, meaning, detailed_meaning, category, significance) VALUES
(1, 'श्री माता', 'Shri Mata', 'The Divine Mother', 'दिव्य माता', 'She who is the supreme mother of all creation', 'The Divine Mother represents the nurturing, compassionate aspect of the Supreme Reality. She is the source of all love, care, and protection in the universe.', 'Divine Attributes', 'This name establishes the maternal relationship between the devotee and the Divine, emphasizing unconditional love and care.'),

(2, 'श्री महाराज्ञी', 'Shri Maharajni', 'The Great Queen', 'महान रानी', 'She who rules over all the three worlds with supreme authority', 'As the Great Queen, She governs the physical, astral, and causal realms with perfect wisdom and justice. Her sovereignty is absolute yet benevolent.', 'Royal Titles', 'This name signifies the supreme authority and power of the Divine Mother over all creation.'),

(3, 'श्रीमत्सिंहासनेश्वरी', 'Shrimat Simhasaneshwari', 'The Goddess of the Lion Throne', 'सिंहासन की देवी', 'She who sits on the divine throne supported by lions', 'The lion throne represents fearlessness, courage, and royal power. She who sits upon it embodies these qualities in their highest form.', 'Divine Throne', 'Lions symbolize courage and strength. Her throne being supported by lions indicates Her mastery over all fears and Her ability to grant courage to devotees.'),

(4, 'चिदग्निकुण्डसम्भूता', 'Chidagnikunda Sambhuta', 'Born from the Fire of Consciousness', 'चेतना की अग्नि से जन्मी', 'She who emerged from the fire pit of pure consciousness', 'This name describes Her origin from the sacred fire of consciousness, representing the transformation of awareness into divine form.', 'Divine Origin', 'The fire of consciousness burns away ignorance and reveals the true nature of reality. She is both the fire and what emerges from it.'),

(5, 'देवकार्यसमुद्यता', 'Deva Karya Samudyata', 'Ready for Divine Work', 'दिव्य कार्य के लिए तत्पर', 'She who is always ready to fulfill the tasks of the gods', 'This name indicates Her constant readiness to help and protect the divine forces and maintain cosmic order.', 'Divine Duty', 'She is ever-vigilant and prepared to act for the welfare of the universe and the protection of righteousness.');

-- Insert daily verses
INSERT INTO daily_verses (sanskrit, transliteration, english, hindi, meaning, date_for) VALUES
('सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके', 'Sarvamangala Mangalye Shive Sarvartha Sadhike', 'She who is the auspiciousness of all auspicious things, the consort of Shiva, the fulfiller of all desires', 'वह जो सभी मंगलकारी वस्तुओं की मंगलता है', 'Invoke the Divine Mother for blessings and fulfillment of righteous desires', CURRENT_DATE),

('शरण्ये त्र्यम्बके गौरी नारायणि नमोऽस्तु ते', 'Sharanye Tryambake Gauri Narayani Namostute', 'O refuge of all, three-eyed one, fair goddess Narayani, salutations to you', 'हे सबकी शरण, त्रिनेत्री, गौरी नारायणी, आपको नमस्कार', 'Seek refuge in the Divine Mother who protects all beings with Her divine vision', CURRENT_DATE + INTERVAL '1 day');

-- Insert user progress sample (this would be created when users register)
-- This is just for reference, actual data will be created through the application
