/**
 * data.js
 * =======
 * Data loading, CSV parsing, default dataset, and CSV exporting utilities.
 */

// Embedded Kaggle SaaS Benchmark Dataset (n=500)
export const DEFAULT_DATASET = [
  {
    "Customer_ID": "068b54d7-7461-4d1c-885e-f5b43efed384",
    "Name": "Alyssa Clark",
    "Email": "shawn43@example.com",
    "Account_Age_Days": 269,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 43.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "5d1e924a-5232-4255-8df9-610e13465816",
    "Name": "Dr. David Austin MD",
    "Email": "woodlydia@example.com",
    "Account_Age_Days": 439,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 9.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "c07c0a8a-bac0-47f9-b93d-57d61490a610",
    "Name": "Dorothy Rose",
    "Email": "naguirre@example.org",
    "Account_Age_Days": 18,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 1.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "cfc0646f-0927-4e8e-b40f-75090340aa0a",
    "Name": "Miranda Gilbert",
    "Email": "xbauer@example.com",
    "Account_Age_Days": 405,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 22.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "67855f87-2552-4273-9aff-1b2060638673",
    "Name": "Adam Hayden",
    "Email": "austinolivia@example.org",
    "Account_Age_Days": 24,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 88.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "14315c24-aa38-40f9-8eaa-bf5f242107d9",
    "Name": "Matthew Ruiz",
    "Email": "donnalewis@example.org",
    "Account_Age_Days": 58,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 50.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "592b837b-6df9-4267-8009-b8a7d1c63e01",
    "Name": "Edgar Taylor",
    "Email": "rodriguezcynthia@example.net",
    "Account_Age_Days": 590,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 42.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 1
  },
  {
    "Customer_ID": "3cbddf97-c9ff-4701-a979-2d2d341aa8fc",
    "Name": "Sabrina Perez",
    "Email": "wdavis@example.org",
    "Account_Age_Days": 185,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 11.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 1
  },
  {
    "Customer_ID": "013b83f4-0c40-4a53-85f2-e2c165cac055",
    "Name": "Shawn Macdonald",
    "Email": "ramosmichael@example.com",
    "Account_Age_Days": 559,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 2.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 0
  },
  {
    "Customer_ID": "7ac4c7f9-94a3-454b-afe5-0f5399679504",
    "Name": "Becky Cook",
    "Email": "lori99@example.net",
    "Account_Age_Days": 88,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 101.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 0
  },
  {
    "Customer_ID": "fda5e6a2-9c88-4f0f-8f33-242b89edc6cb",
    "Name": "Caleb Novak",
    "Email": "heathermahoney@example.org",
    "Account_Age_Days": 911,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 93.0,
    "Last_Support_Ticket": "This tool has saved my team so much time.",
    "Churn": 0
  },
  {
    "Customer_ID": "a37b8137-7b88-4273-b2ed-b9993192e791",
    "Name": "Jonathan Payne",
    "Email": "matthew78@example.com",
    "Account_Age_Days": 130,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 12.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "037ca95f-820c-4fdb-83a1-f491edd89c08",
    "Name": "Jason Olson",
    "Email": "daytimothy@example.net",
    "Account_Age_Days": 954,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 38.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "0825a209-a5eb-4a14-a463-3b942d2b593a",
    "Name": "Bobby Jackson",
    "Email": "joseph15@example.com",
    "Account_Age_Days": 380,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 48.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "a974822d-cc71-48a4-b411-8127968af6f1",
    "Name": "Brian Krueger",
    "Email": "briannasmith@example.net",
    "Account_Age_Days": 816,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 116.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "4ac39e71-cab2-49d9-8b47-f57122404832",
    "Name": "Brittany Contreras DDS",
    "Email": "caldwelljessica@example.net",
    "Account_Age_Days": 39,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 46.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "be0fff09-d876-4715-918d-6b6508f652eb",
    "Name": "Martin Johnson",
    "Email": "thomas56@example.net",
    "Account_Age_Days": 739,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 7.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 0
  },
  {
    "Customer_ID": "bd7ab3f0-bffa-430c-ac66-9f2117926e9e",
    "Name": "Colleen Bowen",
    "Email": "fjackson@example.org",
    "Account_Age_Days": 794,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 90.0,
    "Last_Support_Ticket": "Smooth experience so far, no complaints.",
    "Churn": 0
  },
  {
    "Customer_ID": "03507060-2553-4558-aa6c-a21aa72cb840",
    "Name": "Mrs. Andrea Meza",
    "Email": "gardnerpatricia@example.org",
    "Account_Age_Days": 695,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 49.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "0535cffd-9b93-4556-bf6e-b70464a1628d",
    "Name": "Angelica Young",
    "Email": "robertsmike@example.com",
    "Account_Age_Days": 404,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 52.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 1
  },
  {
    "Customer_ID": "c0efe1bc-4798-4944-b956-aa3845c7677a",
    "Name": "Tracy Buckley",
    "Email": "evan75@example.org",
    "Account_Age_Days": 192,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 45.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "95d0a1a4-1c40-415e-b41d-cb1be763f447",
    "Name": "Jennifer Vasquez",
    "Email": "amyflores@example.net",
    "Account_Age_Days": 465,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 4.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "a74565ec-394a-44b5-93c1-f28e6a081d80",
    "Name": "William Lawrence",
    "Email": "fisherkeith@example.net",
    "Account_Age_Days": 664,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 65.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "b23e7a6f-866d-43ed-a2ce-fc6e82acbfc2",
    "Name": "Mrs. Diana Carney MD",
    "Email": "horntravis@example.org",
    "Account_Age_Days": 702,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 41.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "46739327-a118-4564-80fc-16ba39a18129",
    "Name": "Adam Logan",
    "Email": "kanerobert@example.net",
    "Account_Age_Days": 54,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 53.0,
    "Last_Support_Ticket": "I love the new analytics feature! Great job.",
    "Churn": 0
  },
  {
    "Customer_ID": "41c3619a-656f-4349-9db4-04a990eaa15e",
    "Name": "Joseph Hill",
    "Email": "rachael22@example.net",
    "Account_Age_Days": 567,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 51.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "41d4e7ce-b887-4117-a255-f6a3a39764e8",
    "Name": "Michael Conway",
    "Email": "michaeljackson@example.org",
    "Account_Age_Days": 249,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 38.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 1
  },
  {
    "Customer_ID": "dbf0c0e2-c5d1-411a-bbb2-f7944332f64d",
    "Name": "Ryan Guerra",
    "Email": "rose30@example.org",
    "Account_Age_Days": 36,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 1.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "defd667c-3b78-4283-9f80-5efc4cade554",
    "Name": "Todd Morales",
    "Email": "amelton@example.com",
    "Account_Age_Days": 420,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 17.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "64eb9d06-c46f-41e7-ba93-2cce0b1726b6",
    "Name": "Suzanne Wheeler",
    "Email": "daniel21@example.org",
    "Account_Age_Days": 170,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 51.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "9477c74b-fc76-42b8-b9af-7f66f0dd64b2",
    "Name": "Megan Carr",
    "Email": "joel26@example.net",
    "Account_Age_Days": 41,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 36.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "fcb57156-0ce1-4205-8a90-edabdf0ad96e",
    "Name": "Andrea Parks",
    "Email": "wwright@example.net",
    "Account_Age_Days": 885,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 118.0,
    "Last_Support_Ticket": "Smooth experience so far, no complaints.",
    "Churn": 1
  },
  {
    "Customer_ID": "daf2d5c7-3576-45e8-8304-28ac337d2fd5",
    "Name": "Mrs. Marcia Garcia DVM",
    "Email": "kevin54@example.net",
    "Account_Age_Days": 441,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 8.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "f9961985-6563-49ac-8fc5-ba6092d7f149",
    "Name": "Joanne Robinson",
    "Email": "williamsonterri@example.net",
    "Account_Age_Days": 301,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 2.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 1
  },
  {
    "Customer_ID": "be2af142-ce1a-461b-955b-61be6a842be7",
    "Name": "Justin Bradley",
    "Email": "kathryn65@example.org",
    "Account_Age_Days": 189,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 69.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 1
  },
  {
    "Customer_ID": "dd414b92-77a9-4ba7-a5b8-6b805733b6d4",
    "Name": "Anthony Phillips",
    "Email": "alec40@example.com",
    "Account_Age_Days": 380,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 10.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 0
  },
  {
    "Customer_ID": "48ec32bc-1afa-485c-aa67-2d5da7703402",
    "Name": "Sarah Wells",
    "Email": "hphillips@example.net",
    "Account_Age_Days": 183,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 30.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "d9dc0b2c-818a-4219-810a-e52bd02c4acd",
    "Name": "Jason Davis",
    "Email": "nicole23@example.com",
    "Account_Age_Days": 1045,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 5.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 1
  },
  {
    "Customer_ID": "f94f0ba4-f238-4394-b918-cc72ec9f70bc",
    "Name": "Krista Jones",
    "Email": "ymaddox@example.net",
    "Account_Age_Days": 579,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 43.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "ba67eb55-7b78-41ef-9db8-37c403ae2cc0",
    "Name": "Jared Conrad",
    "Email": "jenniferbolton@example.net",
    "Account_Age_Days": 578,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 47.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "2a4101c1-20b2-499b-8a31-bc86192f0767",
    "Name": "Richard Lawrence",
    "Email": "tasha48@example.org",
    "Account_Age_Days": 833,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 58.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "5f4f3a88-95e4-4499-98ca-0f37197e7d47",
    "Name": "Gabrielle Hughes",
    "Email": "xpruitt@example.com",
    "Account_Age_Days": 1075,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 57.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "0fa0b474-6adb-4723-8acc-899fbd69e615",
    "Name": "Jorge Patel",
    "Email": "progers@example.org",
    "Account_Age_Days": 256,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 46.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "caef9733-6f7f-4503-9660-8c35495f765c",
    "Name": "Diana Davis",
    "Email": "nicole96@example.com",
    "Account_Age_Days": 1079,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 13.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "9072261a-644c-4b21-9b65-d74971291e88",
    "Name": "Shaun Mclean",
    "Email": "kathrynwilliams@example.com",
    "Account_Age_Days": 673,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 1.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "8dcff16d-9d50-4ba5-a7e1-3cfb997f089f",
    "Name": "Alex Perez",
    "Email": "annehayes@example.org",
    "Account_Age_Days": 511,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 11.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "b1550860-620e-485d-b8d6-6e9ef02d96a4",
    "Name": "William Baldwin",
    "Email": "emmamoore@example.net",
    "Account_Age_Days": 1070,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 53.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 1
  },
  {
    "Customer_ID": "7dc0c175-44a1-44c5-bebe-d28d3c2b4aca",
    "Name": "Erica Robertson",
    "Email": "richardgeorge@example.org",
    "Account_Age_Days": 550,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 47.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 1
  },
  {
    "Customer_ID": "4dda9424-bed7-4762-a510-6ac32dc692f3",
    "Name": "Brandon Rodgers",
    "Email": "rgordon@example.net",
    "Account_Age_Days": 265,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 2.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "18680669-ddb4-47ef-9151-a24ec993f075",
    "Name": "Veronica Brown",
    "Email": "joycesusan@example.net",
    "Account_Age_Days": 588,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 105.0,
    "Last_Support_Ticket": "I love the new analytics feature! Great job.",
    "Churn": 0
  },
  {
    "Customer_ID": "0b27d8e2-ee30-40f0-8752-251df023674e",
    "Name": "Angela Lucas",
    "Email": "mark60@example.com",
    "Account_Age_Days": 936,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 29.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 1
  },
  {
    "Customer_ID": "121c3215-7ba2-4984-90ae-7eec5fc9c6ca",
    "Name": "Justin Daugherty",
    "Email": "rogerssarah@example.com",
    "Account_Age_Days": 414,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 18.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "c6a10a5d-eb98-4cf5-bbee-344d85e75500",
    "Name": "Douglas Shepherd",
    "Email": "ryang@example.org",
    "Account_Age_Days": 959,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 36.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "42c1999c-562f-4287-aa3f-2c4b7bc2616e",
    "Name": "Molly Young",
    "Email": "burchheidi@example.org",
    "Account_Age_Days": 105,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 31.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "e8f8e13b-0df2-426b-ae14-85a0f22503eb",
    "Name": "Michael James",
    "Email": "donald36@example.org",
    "Account_Age_Days": 513,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 39.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "e50536fe-971f-4140-a68a-679bd25fde32",
    "Name": "Ashley Hamilton",
    "Email": "eritter@example.org",
    "Account_Age_Days": 989,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 103.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "c3c131d4-3407-4cd1-b37f-1f299c36096a",
    "Name": "Brandi Myers",
    "Email": "wfrost@example.org",
    "Account_Age_Days": 68,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 94.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "59484897-fdc8-44c0-a6ee-020ffb371306",
    "Name": "Anthony Brooks",
    "Email": "fpope@example.org",
    "Account_Age_Days": 875,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 53.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "b5783987-2cb1-4508-b836-b346df6fff76",
    "Name": "Lydia Park",
    "Email": "alexanderadam@example.net",
    "Account_Age_Days": 426,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 23.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "16dcfca0-b78e-4fcc-b2b0-80fafc998620",
    "Name": "Kenneth Austin",
    "Email": "fcarroll@example.org",
    "Account_Age_Days": 855,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 69.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "d6616808-7a72-4f5c-8d16-274ef16368e2",
    "Name": "Douglas Freeman",
    "Email": "laurieleon@example.com",
    "Account_Age_Days": 556,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 10.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 0
  },
  {
    "Customer_ID": "b3f01b66-2c6b-4677-b5e9-9b640179d694",
    "Name": "David Garner",
    "Email": "dwilliams@example.org",
    "Account_Age_Days": 847,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 31.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "d79d9751-cff8-4201-b5e6-7883566fd3ee",
    "Name": "Rebecca Butler",
    "Email": "lewiselizabeth@example.com",
    "Account_Age_Days": 12,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 82.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 0
  },
  {
    "Customer_ID": "31943c00-6222-475b-b8e5-f73b716ac78b",
    "Name": "Daniel Patton",
    "Email": "acostajames@example.com",
    "Account_Age_Days": 161,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 52.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "f1c180b9-6c66-416f-9809-f6cc0ddac29c",
    "Name": "Lynn Good",
    "Email": "jerry02@example.net",
    "Account_Age_Days": 12,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 37.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "de1c52c7-2bf7-412d-8e6d-a14ec99cb15a",
    "Name": "Amy Garcia",
    "Email": "lewisronald@example.com",
    "Account_Age_Days": 466,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 14.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "42df406b-5018-4643-8da1-96237a0014c0",
    "Name": "Kevin Houston",
    "Email": "timothygray@example.com",
    "Account_Age_Days": 836,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 6.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "8f4ee33d-3a1c-4756-a7c3-8bd174cc43ad",
    "Name": "Amanda Peters",
    "Email": "wmorales@example.net",
    "Account_Age_Days": 697,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 44.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "17d10c92-8ca7-45d3-9645-6164b087b857",
    "Name": "Timothy Porter",
    "Email": "cynthialarson@example.com",
    "Account_Age_Days": 121,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 1.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "dfe79a11-1f47-4fdd-ada4-30baa3650d6d",
    "Name": "Samuel Mathews",
    "Email": "jschultz@example.org",
    "Account_Age_Days": 1055,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 38.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 1
  },
  {
    "Customer_ID": "a1974816-6b40-4638-8bea-78a554f15522",
    "Name": "Jared Daugherty",
    "Email": "omar18@example.com",
    "Account_Age_Days": 327,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 65.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "1fb10d61-95bf-49c3-b0c9-d899d0928f51",
    "Name": "Nancy Butler",
    "Email": "vbass@example.com",
    "Account_Age_Days": 135,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 52.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "d0cf61f5-b66a-4dc1-91fe-5659ab632c05",
    "Name": "Christy Goodman",
    "Email": "louismiller@example.org",
    "Account_Age_Days": 984,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 5.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "e13cd79e-4a38-43df-8feb-c6fd37395555",
    "Name": "Maurice Foster",
    "Email": "ewilson@example.org",
    "Account_Age_Days": 539,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 65.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "1a587a8b-7c97-46f1-a686-98e8100a0e57",
    "Name": "Jessica Gardner",
    "Email": "walkerluis@example.com",
    "Account_Age_Days": 1078,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 10.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "d3adb152-4372-4527-8380-280ee3c6615b",
    "Name": "Connor James",
    "Email": "vanessapatrick@example.com",
    "Account_Age_Days": 758,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 11.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 0
  },
  {
    "Customer_ID": "f77b5305-e15f-4452-8775-a9532110d202",
    "Name": "Stephen Thompson",
    "Email": "sedwards@example.net",
    "Account_Age_Days": 619,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 50.0,
    "Last_Support_Ticket": "I love the new analytics feature! Great job.",
    "Churn": 0
  },
  {
    "Customer_ID": "c5ebcc1c-8e44-4de7-9279-411c086cb099",
    "Name": "Wanda Hughes",
    "Email": "johndominguez@example.org",
    "Account_Age_Days": 927,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 15.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "7297e1af-1323-4611-a023-3a004778f01d",
    "Name": "David Tate",
    "Email": "sherri59@example.net",
    "Account_Age_Days": 570,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 51.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 0
  },
  {
    "Customer_ID": "c59fafcf-609a-4fdc-8568-85371412048d",
    "Name": "Shane Chambers",
    "Email": "jimeneztaylor@example.org",
    "Account_Age_Days": 99,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 45.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "7f32dff9-a7ed-43f4-9c6d-1af86b6bdf17",
    "Name": "William Hampton",
    "Email": "bbrown@example.net",
    "Account_Age_Days": 78,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 52.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "fe2c857c-6537-4b90-aa2b-d17d61757993",
    "Name": "Christy West",
    "Email": "smithjose@example.com",
    "Account_Age_Days": 511,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 1.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 0
  },
  {
    "Customer_ID": "efee253f-8fa9-4b80-8599-6d0e36995175",
    "Name": "Zachary Gonzales",
    "Email": "andrewmiller@example.com",
    "Account_Age_Days": 599,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 8.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "db1cc72c-6040-43bb-91c7-c5cee0103a56",
    "Name": "Robert Cummings MD",
    "Email": "markherrera@example.net",
    "Account_Age_Days": 993,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 3.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "085f267c-5aec-47f4-bdc8-a54f576c9e11",
    "Name": "Jennifer Munoz",
    "Email": "robert13@example.com",
    "Account_Age_Days": 324,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 31.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 1
  },
  {
    "Customer_ID": "85d1a2ad-8500-46d0-a9d7-c1d29f568c44",
    "Name": "Deborah Anderson",
    "Email": "ericaross@example.org",
    "Account_Age_Days": 58,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 24.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "e49c9672-c4d2-4391-9e7c-8a54df1a2111",
    "Name": "Tracy Jones",
    "Email": "amy71@example.com",
    "Account_Age_Days": 369,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 28.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "a8289053-ddea-48c9-bdbc-cc3404ecc4ad",
    "Name": "Jason Walker",
    "Email": "nathangarcia@example.net",
    "Account_Age_Days": 126,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 73.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 0
  },
  {
    "Customer_ID": "bc94e14c-e685-4de8-a7f1-488a650cc27b",
    "Name": "Douglas Walsh",
    "Email": "dgarcia@example.com",
    "Account_Age_Days": 13,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 8.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "8c492ebc-9ae4-4584-9dd5-55b727721446",
    "Name": "April White",
    "Email": "omar12@example.net",
    "Account_Age_Days": 314,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 48.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 1
  },
  {
    "Customer_ID": "ea412d7c-ef49-4da8-b79b-2e8b8089d6f5",
    "Name": "Sean Peterson",
    "Email": "scottflynn@example.com",
    "Account_Age_Days": 570,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 27.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "80bf349a-fddb-4d6d-a72a-50f62294a2b9",
    "Name": "Trevor Pierce",
    "Email": "ofreeman@example.net",
    "Account_Age_Days": 331,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 52.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "cb555db3-d9b2-4e3a-884f-a04528d68b39",
    "Name": "James Massey",
    "Email": "angela33@example.com",
    "Account_Age_Days": 1041,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 36.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "539b7a50-b826-45f3-b1ba-2d2c87145839",
    "Name": "Stacey Goodwin",
    "Email": "shawstacey@example.org",
    "Account_Age_Days": 897,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 114.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "96962aac-209b-4579-a33f-e99dfcaf7c1a",
    "Name": "Kelly Lara",
    "Email": "derrickrichardson@example.com",
    "Account_Age_Days": 125,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 5.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "08ec70b7-b329-4db8-aa16-d1b3736a4d4f",
    "Name": "Sara Lopez",
    "Email": "bhoffman@example.com",
    "Account_Age_Days": 228,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 53.0,
    "Last_Support_Ticket": "This tool has saved my team so much time.",
    "Churn": 0
  },
  {
    "Customer_ID": "5bd76019-bd81-439c-a3f1-e655874f91b3",
    "Name": "Savannah Vasquez",
    "Email": "lindseystevens@example.net",
    "Account_Age_Days": 570,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 7.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "e1569e2f-da67-4cde-8c76-661fa1de70f6",
    "Name": "Dawn York",
    "Email": "jameslewis@example.com",
    "Account_Age_Days": 114,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 109.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 0
  },
  {
    "Customer_ID": "473aa375-9d3a-4b52-b512-6070c6dbfe69",
    "Name": "Latasha Espinoza",
    "Email": "moraleschristina@example.org",
    "Account_Age_Days": 788,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 43.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "8f321092-cb86-4a84-bee2-a5343b536e13",
    "Name": "Darryl Ramirez",
    "Email": "dharris@example.com",
    "Account_Age_Days": 922,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 16.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "98221bc5-307f-424f-9d94-e3b6b02d2d05",
    "Name": "William Gray",
    "Email": "haneyamanda@example.com",
    "Account_Age_Days": 351,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 50.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "69e54cab-6f52-45f4-a802-7d0e7296b713",
    "Name": "Lori Wilson",
    "Email": "melissajimenez@example.com",
    "Account_Age_Days": 974,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 14.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 0
  },
  {
    "Customer_ID": "e21cd418-0533-4a73-8b11-60d01aa12377",
    "Name": "Tonya Castro",
    "Email": "uware@example.com",
    "Account_Age_Days": 65,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 1.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "249aa8d3-5aad-4b19-9e0b-66f79a9d7be9",
    "Name": "Sara Zamora",
    "Email": "wmorris@example.com",
    "Account_Age_Days": 108,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 13.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "615bf6c9-1290-4266-9221-2671e5c8b8f9",
    "Name": "Lori Shaw",
    "Email": "ashleyglover@example.org",
    "Account_Age_Days": 517,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 47.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "27bca0d5-7bcc-4fe5-bf93-c955241c6816",
    "Name": "Megan Chapman",
    "Email": "cassandra55@example.org",
    "Account_Age_Days": 1017,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 109.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 0
  },
  {
    "Customer_ID": "d37576da-7128-4d3c-9d01-c5ffb7bd378f",
    "Name": "Jeffrey Norton",
    "Email": "brianna40@example.net",
    "Account_Age_Days": 321,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 33.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "58d7c51e-ce39-4383-8abb-9d778aacc71a",
    "Name": "Brian Collier",
    "Email": "sgarcia@example.com",
    "Account_Age_Days": 355,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 16.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "703e8cb1-b47a-444c-bcba-ff1dfdbff520",
    "Name": "Jennifer Williams",
    "Email": "jasmine51@example.org",
    "Account_Age_Days": 410,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 9.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 0
  },
  {
    "Customer_ID": "3526f839-9868-470c-ae9b-51b3d474061d",
    "Name": "Mary Mcdaniel MD",
    "Email": "carl79@example.com",
    "Account_Age_Days": 938,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 30.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "60983901-ce29-49f4-8e78-0a4696176dd0",
    "Name": "Jennifer Espinoza",
    "Email": "brownsheila@example.org",
    "Account_Age_Days": 680,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 30.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "91a5c6b0-8da6-4d98-9a42-ab595e99ca31",
    "Name": "Jeffrey Smith",
    "Email": "yvonnehester@example.com",
    "Account_Age_Days": 1084,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 43.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "135d8981-3395-448e-8dd0-39f625467fee",
    "Name": "Matthew Collins",
    "Email": "jwalsh@example.net",
    "Account_Age_Days": 624,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 17.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "53fefe35-4515-4a8f-b0ec-f1b7bd66b58a",
    "Name": "Nicole Gonzalez",
    "Email": "james33@example.com",
    "Account_Age_Days": 986,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 11.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "5008f124-cd85-418d-a649-4170dc2bd022",
    "Name": "Haley Randolph",
    "Email": "travis69@example.net",
    "Account_Age_Days": 85,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 50.0,
    "Last_Support_Ticket": "I love the new analytics feature! Great job.",
    "Churn": 0
  },
  {
    "Customer_ID": "ff7a9a15-73f2-48b4-9ecb-b27bf8d4d79a",
    "Name": "Jodi Espinoza",
    "Email": "jay35@example.org",
    "Account_Age_Days": 496,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 28.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "91a68053-0621-48f1-a8d8-d476a73915f5",
    "Name": "Michael Taylor",
    "Email": "smithrandy@example.com",
    "Account_Age_Days": 200,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 116.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "0c7eaec9-ff53-4b30-9c35-21ae38d7e8dd",
    "Name": "Mark Wood",
    "Email": "karenconway@example.org",
    "Account_Age_Days": 371,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 26.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "0b9b5227-b604-43a1-8db7-479f8eb6704e",
    "Name": "Lauren Travis",
    "Email": "grantstephanie@example.com",
    "Account_Age_Days": 708,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 38.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "0d5c3971-f433-43a5-817c-a3c09f9fb51a",
    "Name": "Donald Washington",
    "Email": "pateldouglas@example.net",
    "Account_Age_Days": 50,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 74.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "0016b14c-da3e-41a0-ace3-2571d8f28e6f",
    "Name": "Sara Koch",
    "Email": "johngordon@example.net",
    "Account_Age_Days": 590,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 49.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 1
  },
  {
    "Customer_ID": "cfd07111-4eb2-4740-8f59-8c133b09080f",
    "Name": "Vanessa Carr",
    "Email": "wortiz@example.net",
    "Account_Age_Days": 586,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 29.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "7cca8ae0-53c9-410c-b1b9-c0dec6ca92b1",
    "Name": "Glenn Mendez",
    "Email": "younglindsay@example.com",
    "Account_Age_Days": 919,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 52.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "875ba1c3-11a9-40c3-93d9-d87d50d35650",
    "Name": "Angela Murphy",
    "Email": "hayesernest@example.com",
    "Account_Age_Days": 840,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 13.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "9bdd9228-457b-447f-8cf9-0ec16036396d",
    "Name": "Charles Smith",
    "Email": "kristin79@example.org",
    "Account_Age_Days": 1057,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 12.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "1baaac13-2a06-479b-be24-5aa54960f5fb",
    "Name": "Christina Richardson",
    "Email": "jacob41@example.org",
    "Account_Age_Days": 194,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 14.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "7f78655b-db3c-449b-8051-633d1a3b1326",
    "Name": "Russell Edwards",
    "Email": "elizabeth55@example.net",
    "Account_Age_Days": 1094,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 44.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 1
  },
  {
    "Customer_ID": "9c022bb1-f506-445f-b465-289ff95b0b04",
    "Name": "Albert Bentley",
    "Email": "marksrobert@example.org",
    "Account_Age_Days": 210,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 59.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "c9cfed25-fbcd-407c-be1f-e2807b39b8eb",
    "Name": "Diane West",
    "Email": "qrobertson@example.org",
    "Account_Age_Days": 430,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 10.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "e1cac510-73fd-4c73-bd54-e924f707883d",
    "Name": "Jennifer Flores",
    "Email": "paula53@example.net",
    "Account_Age_Days": 1044,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 5.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 1
  },
  {
    "Customer_ID": "86597ebe-ceb6-410a-8e40-32f2d19dbc5c",
    "Name": "Cole Williams",
    "Email": "matthew13@example.net",
    "Account_Age_Days": 620,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 23.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 1
  },
  {
    "Customer_ID": "bbb8a3a7-3f0e-46fb-af82-1361f14860d0",
    "Name": "Deborah Ballard",
    "Email": "mitchellruiz@example.net",
    "Account_Age_Days": 757,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 45.0,
    "Last_Support_Ticket": "This tool has saved my team so much time.",
    "Churn": 0
  },
  {
    "Customer_ID": "17e44e32-d680-43df-a315-56a62f5a5427",
    "Name": "James Riley",
    "Email": "stokesbrianna@example.net",
    "Account_Age_Days": 665,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 29.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "bb7b8799-c20b-4adc-bbe3-1629da49beff",
    "Name": "Aaron Ward",
    "Email": "collinskevin@example.net",
    "Account_Age_Days": 244,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 98.0,
    "Last_Support_Ticket": "I love the new analytics feature! Great job.",
    "Churn": 0
  },
  {
    "Customer_ID": "72c19964-af42-4b50-9861-ee9c6a6a9dd4",
    "Name": "James Cole",
    "Email": "kevinross@example.com",
    "Account_Age_Days": 502,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 6.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "36c5678e-3c45-43f8-972b-722d65afd899",
    "Name": "Sheila Vega",
    "Email": "shawnmunoz@example.net",
    "Account_Age_Days": 210,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 4.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "dc7929cc-2b6a-4df0-8d47-93f9fa8c3bdb",
    "Name": "Robert Morris",
    "Email": "erinchase@example.org",
    "Account_Age_Days": 83,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 96.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 0
  },
  {
    "Customer_ID": "26730da4-ea57-44d0-9e7c-79f01d310151",
    "Name": "Joy Phillips",
    "Email": "olivercharles@example.net",
    "Account_Age_Days": 901,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 94.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "db4fcea1-9de1-4a65-838b-cb213b9a8c88",
    "Name": "Amy Kelly",
    "Email": "teresa66@example.net",
    "Account_Age_Days": 664,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 100.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "53de08f4-a3d4-4d29-a10e-e067e61f9bba",
    "Name": "John Robinson",
    "Email": "brianortiz@example.com",
    "Account_Age_Days": 698,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 97.0,
    "Last_Support_Ticket": "Smooth experience so far, no complaints.",
    "Churn": 0
  },
  {
    "Customer_ID": "313a1c9f-4350-4dab-ac84-533dee477503",
    "Name": "Kayla Gibbs",
    "Email": "omcintosh@example.net",
    "Account_Age_Days": 695,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 57.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 1
  },
  {
    "Customer_ID": "f918ebe8-67d7-4789-b78a-aa636c06bfc3",
    "Name": "Eric Pierce",
    "Email": "psandoval@example.net",
    "Account_Age_Days": 899,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 110.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "211d3459-3e07-49db-87e5-ab7a448182e0",
    "Name": "Thomas Mcdonald",
    "Email": "alvaradovirginia@example.org",
    "Account_Age_Days": 1093,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 3.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "19875afd-006a-4450-863a-59f33c10a2c3",
    "Name": "David Woodard",
    "Email": "alexander38@example.org",
    "Account_Age_Days": 467,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 47.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "33cce1ba-ecf0-4359-ac07-b54e9eecae6e",
    "Name": "Robert Walls",
    "Email": "brendahowe@example.org",
    "Account_Age_Days": 140,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 19.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "d0338ae2-1ff0-4220-a852-ed3380546cf3",
    "Name": "Steven Russell",
    "Email": "collinsmary@example.net",
    "Account_Age_Days": 212,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 59.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "6efa0660-5985-4619-8ea2-83c1cc034bf3",
    "Name": "Julia White",
    "Email": "nboyd@example.com",
    "Account_Age_Days": 797,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 47.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "ee6794ab-6efb-43bb-b8b2-f5f44e2c48a4",
    "Name": "Carrie Jackson",
    "Email": "allenkristin@example.org",
    "Account_Age_Days": 989,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 18.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "a50b9974-8468-472d-b526-b64f2a9a0e0c",
    "Name": "Rachel Wilson",
    "Email": "kevin10@example.org",
    "Account_Age_Days": 299,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 105.0,
    "Last_Support_Ticket": "This tool has saved my team so much time.",
    "Churn": 0
  },
  {
    "Customer_ID": "010492b3-561f-42e6-863c-40523d750ff8",
    "Name": "Thomas Dean",
    "Email": "franciscogriffith@example.org",
    "Account_Age_Days": 748,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 1.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 0
  },
  {
    "Customer_ID": "fbd64070-8df0-48ce-bdad-4b8496dd8cd7",
    "Name": "Andrea Davis",
    "Email": "bradleyanthony@example.org",
    "Account_Age_Days": 726,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 10.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "91534361-0492-4f05-b189-acb52d0270b6",
    "Name": "Christopher Taylor",
    "Email": "andrewho@example.net",
    "Account_Age_Days": 74,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 4.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "bdb4942a-d3a4-4f3c-a0ce-584ba56cb2e4",
    "Name": "Christopher Bonilla",
    "Email": "jenniferaguirre@example.org",
    "Account_Age_Days": 258,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 70.0,
    "Last_Support_Ticket": "I love the new analytics feature! Great job.",
    "Churn": 0
  },
  {
    "Customer_ID": "850cc9fe-84bc-42e4-bcd8-39ecc9451df0",
    "Name": "Michelle Carrillo",
    "Email": "sheliawilson@example.net",
    "Account_Age_Days": 546,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 14.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "e54405e8-2273-4aa3-a3a0-76ae8b87acd3",
    "Name": "Tyler Paul",
    "Email": "ykrause@example.com",
    "Account_Age_Days": 117,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 22.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 1
  },
  {
    "Customer_ID": "02289e0c-0c3b-4fb5-96f0-4342cdfdd468",
    "Name": "Ryan Mcintyre",
    "Email": "melindawilliams@example.net",
    "Account_Age_Days": 899,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 18.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "83c4a0f7-8c63-4423-b9a3-96ba79228e41",
    "Name": "Toni Cook",
    "Email": "qshepherd@example.net",
    "Account_Age_Days": 397,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 3.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "4a09500b-e74b-498c-b3e9-f4121aad6276",
    "Name": "Deborah Blackburn",
    "Email": "jaredturner@example.org",
    "Account_Age_Days": 1013,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 43.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "908bb014-37eb-4cdf-85d1-5b1cc4591cfd",
    "Name": "Lisa Patterson DDS",
    "Email": "tlopez@example.com",
    "Account_Age_Days": 488,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 48.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "7ac6f200-4d29-4af6-ad22-80977e639544",
    "Name": "Danielle Heath",
    "Email": "hubbardabigail@example.net",
    "Account_Age_Days": 389,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 5.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "5b68946d-4891-4dbe-b02e-edffd5f8a911",
    "Name": "Ashley Morris",
    "Email": "jacquelinerobertson@example.net",
    "Account_Age_Days": 106,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 17.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "d2b63b2e-0bd8-4c56-8f8a-56bc0aa5dff2",
    "Name": "Logan Patterson",
    "Email": "gomezbill@example.org",
    "Account_Age_Days": 78,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 7.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "fb23c75a-9a6a-420f-800c-048de923ca0f",
    "Name": "James Torres",
    "Email": "jesse98@example.net",
    "Account_Age_Days": 455,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 62.0,
    "Last_Support_Ticket": "Smooth experience so far, no complaints.",
    "Churn": 0
  },
  {
    "Customer_ID": "052927fe-e69b-49e9-ad44-7ee349444c0d",
    "Name": "William Thornton",
    "Email": "mariahgarcia@example.org",
    "Account_Age_Days": 395,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 26.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 1
  },
  {
    "Customer_ID": "bff7488c-0696-4075-95d7-540a0fa37145",
    "Name": "Michael Steele",
    "Email": "jerry59@example.com",
    "Account_Age_Days": 662,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 42.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "820054d9-3750-4844-b63e-eccec0e6218c",
    "Name": "Monica Ali",
    "Email": "april24@example.net",
    "Account_Age_Days": 738,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 103.0,
    "Last_Support_Ticket": "I love the new analytics feature! Great job.",
    "Churn": 0
  },
  {
    "Customer_ID": "1d0e978c-94ba-45d1-a26a-f2a6dff4f2ce",
    "Name": "Chelsea Frey",
    "Email": "coltonbaker@example.com",
    "Account_Age_Days": 27,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 41.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 1
  },
  {
    "Customer_ID": "78ba00dd-6803-467e-a0a3-682f4aa69621",
    "Name": "Anthony Long",
    "Email": "tavila@example.net",
    "Account_Age_Days": 234,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 7.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "44f3f0db-f0ac-49f2-b3f0-1dc928513bd9",
    "Name": "Sandra Collins",
    "Email": "chavezrichard@example.org",
    "Account_Age_Days": 103,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 18.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "f410650a-8634-458a-bfdd-c4a3f1275c88",
    "Name": "Anthony Pitts",
    "Email": "juliefreeman@example.org",
    "Account_Age_Days": 11,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 85.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "2c25ac06-317b-47f3-8149-024857ff9e87",
    "Name": "Michael Young",
    "Email": "reedbarbara@example.net",
    "Account_Age_Days": 618,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 5.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "2aeb78ea-16f0-4636-9e9e-99a01bd7a560",
    "Name": "Robert Crawford",
    "Email": "kristinzimmerman@example.org",
    "Account_Age_Days": 616,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 115.0,
    "Last_Support_Ticket": "I love the new analytics feature! Great job.",
    "Churn": 0
  },
  {
    "Customer_ID": "3d00d11f-5cd9-49df-a7c8-b6f8b4fdb6e9",
    "Name": "Jessica Moss",
    "Email": "johnny54@example.net",
    "Account_Age_Days": 638,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 10.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 0
  },
  {
    "Customer_ID": "71e95291-2b7a-4b4e-80f3-93cf106882c6",
    "Name": "Michael Sutton",
    "Email": "curryana@example.org",
    "Account_Age_Days": 623,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 41.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 1
  },
  {
    "Customer_ID": "1c973d1c-1e5e-4c70-ad59-c12e5b298a5a",
    "Name": "Raymond Copeland DVM",
    "Email": "anthony01@example.com",
    "Account_Age_Days": 990,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 45.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "1e480f8e-63ac-46b2-8a02-e020d593d2c3",
    "Name": "Tiffany Hill",
    "Email": "gevans@example.com",
    "Account_Age_Days": 520,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 91.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "096fede7-8470-4f83-9ee6-a2b77cdc31e5",
    "Name": "Steven Burch",
    "Email": "hollygreene@example.org",
    "Account_Age_Days": 209,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 49.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "53547069-1f7d-4f62-af34-8438b2ece131",
    "Name": "Joshua Thompson",
    "Email": "acostaamy@example.net",
    "Account_Age_Days": 118,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 27.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "4b9b4d68-57bc-432a-b79f-ce6232a85ce9",
    "Name": "Christopher Small",
    "Email": "william10@example.com",
    "Account_Age_Days": 314,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 33.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "55690ebe-24d8-4af3-8336-d6358141ae5e",
    "Name": "Lori Hernandez",
    "Email": "johnharrington@example.com",
    "Account_Age_Days": 170,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 25.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "4014fac9-3fb8-438b-a2d7-417d00e9c5bf",
    "Name": "Christopher Hoover",
    "Email": "david25@example.org",
    "Account_Age_Days": 676,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 12.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "38ecfe94-16ff-4a89-a2f3-3eb5e1cf1465",
    "Name": "Kelly Cook",
    "Email": "robertsgeorge@example.net",
    "Account_Age_Days": 686,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 14.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 0
  },
  {
    "Customer_ID": "3119857e-e2a0-4af9-ac88-a94694d76a59",
    "Name": "Daniel Webb",
    "Email": "stephen98@example.com",
    "Account_Age_Days": 898,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 8.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 1
  },
  {
    "Customer_ID": "f92e7db1-ecd1-4779-b04a-9d8240d5f642",
    "Name": "Robert Hanna",
    "Email": "asmith@example.net",
    "Account_Age_Days": 593,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 29.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "492bbf3f-4043-46b4-a22f-fd6e4190202c",
    "Name": "Darrell Maldonado",
    "Email": "susan20@example.org",
    "Account_Age_Days": 187,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 88.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 1
  },
  {
    "Customer_ID": "6b0f1a5f-0b23-460a-a6e2-18278bbfd89d",
    "Name": "Maria Munoz",
    "Email": "natalieduncan@example.net",
    "Account_Age_Days": 221,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 67.0,
    "Last_Support_Ticket": "I love the new analytics feature! Great job.",
    "Churn": 0
  },
  {
    "Customer_ID": "bdbab6cc-9b70-48aa-8336-d5118e9bd568",
    "Name": "Brent Shaw",
    "Email": "robert42@example.org",
    "Account_Age_Days": 580,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 92.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "4014fc73-ed35-439a-8f13-1b63d8fcd478",
    "Name": "Dennis Ali",
    "Email": "brianna79@example.com",
    "Account_Age_Days": 106,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 46.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "a7e729c0-15bc-426c-b4c4-c93d29417be1",
    "Name": "Thomas Wood",
    "Email": "mirandabrian@example.org",
    "Account_Age_Days": 274,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 42.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "ad95ae0f-688a-4ba4-b6ba-943aac9bbd32",
    "Name": "George Garner",
    "Email": "klinejerry@example.org",
    "Account_Age_Days": 162,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 116.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "ed207729-f304-4311-b3e1-92ce26cca057",
    "Name": "Rodney Diaz",
    "Email": "dixontracy@example.net",
    "Account_Age_Days": 41,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 55.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 1
  },
  {
    "Customer_ID": "cea071c6-1042-4e0c-80d3-c631e7667b0a",
    "Name": "Curtis Baker",
    "Email": "fspencer@example.net",
    "Account_Age_Days": 49,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 19.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "55b16f89-e750-4cef-a356-d343c927d6fc",
    "Name": "Michael Weeks",
    "Email": "rtodd@example.com",
    "Account_Age_Days": 652,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 38.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "16982188-2221-4667-8751-908a7cfdb252",
    "Name": "Wesley Huffman",
    "Email": "ahickman@example.org",
    "Account_Age_Days": 253,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 57.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "f0f9dcb3-3c85-4353-ab0f-340d2126e6fd",
    "Name": "Megan Lopez",
    "Email": "ryanflores@example.org",
    "Account_Age_Days": 320,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 41.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 1
  },
  {
    "Customer_ID": "e08ef5d0-24ca-4ef2-a4ca-696cf3235c67",
    "Name": "Kimberly Carr",
    "Email": "christina96@example.com",
    "Account_Age_Days": 880,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 90.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 1
  },
  {
    "Customer_ID": "f892ad4a-f585-4a48-8d7d-e1ab91fb4c1c",
    "Name": "Jeffrey Garza",
    "Email": "baileyclaire@example.com",
    "Account_Age_Days": 515,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 39.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "87ad18db-dee3-4d64-8483-f6938628429c",
    "Name": "John Lynch",
    "Email": "loripetersen@example.net",
    "Account_Age_Days": 421,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 50.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 1
  },
  {
    "Customer_ID": "7ac174b7-e5dd-4be7-9052-26fb56475ad8",
    "Name": "Jacob Ferguson",
    "Email": "christophermills@example.org",
    "Account_Age_Days": 115,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 14.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "fe378c17-da89-4670-9d11-ecdb8a653d9a",
    "Name": "Michael Becker",
    "Email": "jennifergordon@example.org",
    "Account_Age_Days": 491,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 23.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "99c2b496-a92f-4c7e-9b4e-13b74110b449",
    "Name": "Allison Sims",
    "Email": "graylaura@example.net",
    "Account_Age_Days": 174,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 4.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "fe7908da-c045-48aa-a1d0-73689acae60a",
    "Name": "Kevin Jackson PhD",
    "Email": "xadams@example.com",
    "Account_Age_Days": 969,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 40.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "62cd94d9-91c5-4616-b29b-eed3fedd2fe3",
    "Name": "Michael Perez",
    "Email": "thuber@example.com",
    "Account_Age_Days": 174,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 24.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "e03cd796-6401-4196-ba28-626c02978bdd",
    "Name": "Brooke Taylor",
    "Email": "branchtimothy@example.org",
    "Account_Age_Days": 169,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 7.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 0
  },
  {
    "Customer_ID": "dda255c2-2f55-4ce9-aab1-2ffdb1f5027c",
    "Name": "Elizabeth Christensen",
    "Email": "sarah35@example.net",
    "Account_Age_Days": 1042,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 56.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "df5d3d3e-9bd9-48d3-b203-847e6d2edd1a",
    "Name": "Robert Zimmerman",
    "Email": "teresa74@example.net",
    "Account_Age_Days": 207,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 43.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "e2f47540-f9fc-4405-bdd0-11c2ff84135d",
    "Name": "Jacob Rose",
    "Email": "gkey@example.net",
    "Account_Age_Days": 505,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 18.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "1fde5ab1-0bca-420d-9682-8450f11ca7ee",
    "Name": "Scott Jennings",
    "Email": "ssmith@example.org",
    "Account_Age_Days": 806,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 56.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "eff03bc1-1da6-4b5f-8867-a0eb7670a49f",
    "Name": "Rachel Blake",
    "Email": "barbara30@example.org",
    "Account_Age_Days": 115,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 46.0,
    "Last_Support_Ticket": "This tool has saved my team so much time.",
    "Churn": 0
  },
  {
    "Customer_ID": "9ceb3eb2-913e-4b50-98bb-122fc6ed2d75",
    "Name": "Jonathan Mcclain",
    "Email": "ortiztonya@example.net",
    "Account_Age_Days": 588,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 9.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "4adb86d9-01ca-4b99-8c91-afa01de20d69",
    "Name": "James Dunn",
    "Email": "kthomas@example.org",
    "Account_Age_Days": 555,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 54.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "3b323003-07ec-4d70-8aa7-2c46d335e59d",
    "Name": "Matthew Holloway",
    "Email": "tyler35@example.com",
    "Account_Age_Days": 159,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 42.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "371fe871-e8da-474c-bbe3-bb490956f755",
    "Name": "Donna Frank",
    "Email": "michellerobinson@example.net",
    "Account_Age_Days": 1030,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 56.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "6782fab3-4eed-4944-95f9-c85df3bc8194",
    "Name": "Elizabeth Willis",
    "Email": "robinsondenise@example.com",
    "Account_Age_Days": 684,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 14.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "f2ae89c4-a827-4233-b41c-3caeb9f9dec6",
    "Name": "Jennifer Flores",
    "Email": "vclayton@example.net",
    "Account_Age_Days": 1027,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 36.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "5deae017-a857-42ba-b651-657ef79a5537",
    "Name": "Kevin Jones",
    "Email": "jessicalindsey@example.net",
    "Account_Age_Days": 204,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 23.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "22818bbe-064d-4d8b-8f1d-da33007891a7",
    "Name": "Tony Spencer",
    "Email": "vwilson@example.net",
    "Account_Age_Days": 27,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 54.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 1
  },
  {
    "Customer_ID": "f0f280c1-1c58-4842-8473-0713d1f61afb",
    "Name": "Mr. Christopher Lewis Jr.",
    "Email": "hmcintyre@example.org",
    "Account_Age_Days": 338,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 12.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "c16aabd1-a0b5-46a3-b09c-4aa0cbee9151",
    "Name": "Robert Moore",
    "Email": "gordondonald@example.net",
    "Account_Age_Days": 52,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 40.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "462c8b4f-2d39-4e99-a696-243c79b2f11c",
    "Name": "Kelly Bowman",
    "Email": "ugrant@example.net",
    "Account_Age_Days": 536,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 37.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 1
  },
  {
    "Customer_ID": "c7dc4454-be5b-4ac6-a3b4-26abb1689d8a",
    "Name": "Regina Johnson",
    "Email": "sburton@example.org",
    "Account_Age_Days": 146,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 14.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 1
  },
  {
    "Customer_ID": "6cb486d1-2886-4ea6-9262-4d7b77a0819f",
    "Name": "Anthony Wu",
    "Email": "brendawilliams@example.org",
    "Account_Age_Days": 1039,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 16.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "39f6238b-4460-4738-a16e-b0bcc13856e0",
    "Name": "Katherine Lee",
    "Email": "dana81@example.net",
    "Account_Age_Days": 616,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 55.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "94defea5-d7f5-4b8f-a73a-03cb3b860038",
    "Name": "Jacqueline Ellis",
    "Email": "jacobgolden@example.org",
    "Account_Age_Days": 434,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 46.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 0
  },
  {
    "Customer_ID": "3767c349-abcf-40fc-adfb-903c72267f4b",
    "Name": "Chad Smith",
    "Email": "christopher33@example.net",
    "Account_Age_Days": 221,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 12.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "1f7378c3-7ac3-461d-97ad-5ed2426ab696",
    "Name": "Shelia Diaz",
    "Email": "schmidtjames@example.com",
    "Account_Age_Days": 1012,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 85.0,
    "Last_Support_Ticket": "This tool has saved my team so much time.",
    "Churn": 0
  },
  {
    "Customer_ID": "faa5dbb9-de69-4a65-91fa-2fc9f902f862",
    "Name": "Anthony Reynolds",
    "Email": "christopher74@example.org",
    "Account_Age_Days": 619,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 1.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "0f636b3d-c57b-47af-a845-f4857b75249d",
    "Name": "Leslie Hanson",
    "Email": "johnsontimothy@example.net",
    "Account_Age_Days": 607,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 9.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 0
  },
  {
    "Customer_ID": "863a3867-fcd6-446b-9d56-a49f10a29d6f",
    "Name": "Chelsea Smith",
    "Email": "jeffrey35@example.net",
    "Account_Age_Days": 516,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 7.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "4f6b72f2-ec08-4d53-9d36-693810d268b5",
    "Name": "Teresa Norris",
    "Email": "johnny39@example.net",
    "Account_Age_Days": 405,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 26.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 1
  },
  {
    "Customer_ID": "a96b016e-7bb9-4a84-9f1f-5c5a14176804",
    "Name": "David Underwood",
    "Email": "robertmartin@example.org",
    "Account_Age_Days": 47,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 49.0,
    "Last_Support_Ticket": "This tool has saved my team so much time.",
    "Churn": 0
  },
  {
    "Customer_ID": "bbbda215-b464-4013-88d7-f1be2961d5e7",
    "Name": "Mary Ortiz",
    "Email": "matthew01@example.org",
    "Account_Age_Days": 597,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 37.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "b2b1d687-2133-46b0-9a06-0429b934f99c",
    "Name": "Yolanda Rush",
    "Email": "jacobnelson@example.com",
    "Account_Age_Days": 97,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 17.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "b0cd1707-4270-4ba7-9464-c1b86ea9286b",
    "Name": "Billy Ray",
    "Email": "kimberlyrobinson@example.org",
    "Account_Age_Days": 74,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 57.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 1
  },
  {
    "Customer_ID": "d9bdfe0d-720e-4cbb-b836-d1d068c3bedf",
    "Name": "Maria Kim",
    "Email": "jessicasummers@example.net",
    "Account_Age_Days": 607,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 26.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 1
  },
  {
    "Customer_ID": "34d1eac0-1f76-4ea4-a59b-a82ca2388edd",
    "Name": "Amy Garcia",
    "Email": "denisekeller@example.org",
    "Account_Age_Days": 920,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 20.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "178f73c7-a79a-4459-8631-b9e27e3274e2",
    "Name": "Shelley Christensen",
    "Email": "tjimenez@example.org",
    "Account_Age_Days": 588,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 1.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "33ab11ed-9f50-4197-92d3-25bb7313153e",
    "Name": "Katherine Washington",
    "Email": "sarahsoto@example.com",
    "Account_Age_Days": 991,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 11.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "54c2994e-2779-4f53-83a8-96ea0e0f5ed3",
    "Name": "Cristina Todd",
    "Email": "mcdowellseth@example.com",
    "Account_Age_Days": 1056,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 36.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "a0334960-03de-416e-89f6-25813bd944fc",
    "Name": "Edward Wright",
    "Email": "kyle01@example.net",
    "Account_Age_Days": 1006,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 37.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 1
  },
  {
    "Customer_ID": "c0398004-897b-4fa3-a303-b7045c80175d",
    "Name": "Stephanie Cook",
    "Email": "ygreen@example.net",
    "Account_Age_Days": 233,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 33.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "d01412f9-cda5-4c33-95fa-b4c4b7863fca",
    "Name": "Nicole Braun",
    "Email": "michaelmayer@example.net",
    "Account_Age_Days": 753,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 59.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "629ce6eb-439d-497c-a38f-0e94f0a8b912",
    "Name": "Kayla Nguyen",
    "Email": "todd46@example.net",
    "Account_Age_Days": 738,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 8.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "c95cf20f-9ee0-466e-88c5-531e906feaa4",
    "Name": "Emily Adkins",
    "Email": "pdavis@example.net",
    "Account_Age_Days": 857,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 68.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "e6930d54-a940-44f6-b4d0-af5174184858",
    "Name": "Chelsey Fernandez",
    "Email": "mendozakelly@example.com",
    "Account_Age_Days": 212,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 33.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "51177bd7-7753-4123-b6f4-70aea9f2ecd2",
    "Name": "Jennifer Ramos",
    "Email": "romeroandrea@example.net",
    "Account_Age_Days": 35,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 59.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "a1e42acc-34fe-49db-866b-9d4e5c6ad4c2",
    "Name": "Tonya Campbell",
    "Email": "markdavis@example.com",
    "Account_Age_Days": 251,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 36.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "ae57df1c-e886-4e78-97b8-db45dd844100",
    "Name": "Carl Long",
    "Email": "julie77@example.net",
    "Account_Age_Days": 571,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 4.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 0
  },
  {
    "Customer_ID": "d4a30053-d626-4b34-adc4-72765920e868",
    "Name": "Savannah Sutton",
    "Email": "herreradawn@example.net",
    "Account_Age_Days": 429,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 5.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "e29e8568-6743-46e5-8818-4b36b9a669f3",
    "Name": "Melanie Bradley",
    "Email": "john19@example.net",
    "Account_Age_Days": 133,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 14.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "e8c2cc02-0183-4b44-b5b1-652478450123",
    "Name": "Elizabeth Higgins",
    "Email": "hwhite@example.com",
    "Account_Age_Days": 524,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 1.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 1
  },
  {
    "Customer_ID": "0d088a1a-1a8c-47bc-b1e3-2883567c8d57",
    "Name": "Robert Lopez",
    "Email": "david00@example.net",
    "Account_Age_Days": 49,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 119.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "247162ce-3d2f-42d6-8137-18cef4c9bca7",
    "Name": "Tiffany Kelly",
    "Email": "johnsoncasey@example.org",
    "Account_Age_Days": 508,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 54.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "be8c5181-2071-426c-8fa9-914887b56150",
    "Name": "Stephanie Holland",
    "Email": "duncanmark@example.net",
    "Account_Age_Days": 994,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 50.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "cd4831fa-dc93-4c2e-8342-f4668c99d6c6",
    "Name": "Brittany Patterson",
    "Email": "edward37@example.com",
    "Account_Age_Days": 366,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 59.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "9072713f-561f-4c1b-952b-f2d759535fb8",
    "Name": "Helen Morgan",
    "Email": "alexisjenkins@example.com",
    "Account_Age_Days": 330,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 38.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "af15cd0d-ea79-4271-9081-036e922ea5f0",
    "Name": "Rodney Proctor",
    "Email": "wbrown@example.org",
    "Account_Age_Days": 470,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 5.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "4218c602-d70e-46e7-9c17-2280d46e79e7",
    "Name": "Meghan Gonzalez",
    "Email": "jonathan36@example.net",
    "Account_Age_Days": 833,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 52.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 1
  },
  {
    "Customer_ID": "c2c24860-bbc1-459f-9b82-793b0704bdd1",
    "Name": "Manuel Eaton",
    "Email": "christophermartinez@example.org",
    "Account_Age_Days": 798,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 52.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 1
  },
  {
    "Customer_ID": "3383aeb0-8d25-4b8a-af45-cdf55f243a5f",
    "Name": "Dr. Cynthia Knox MD",
    "Email": "kedwards@example.com",
    "Account_Age_Days": 238,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 19.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "1466024d-73f3-450e-923f-03ceaf2b7055",
    "Name": "Amanda Pearson",
    "Email": "drakeryan@example.net",
    "Account_Age_Days": 766,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 28.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "016a1918-9928-49de-9f4a-1588fe2609b7",
    "Name": "Michelle Benjamin",
    "Email": "harrisnancy@example.com",
    "Account_Age_Days": 546,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 37.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "1c268f25-b778-47b8-a771-9f7e60da1dea",
    "Name": "Michael Perry",
    "Email": "hclark@example.com",
    "Account_Age_Days": 157,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 25.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "4214ecda-8da6-4223-b3a4-8b5088f112d2",
    "Name": "Anthony Rhodes",
    "Email": "lisamejia@example.com",
    "Account_Age_Days": 976,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 56.0,
    "Last_Support_Ticket": "I love the new analytics feature! Great job.",
    "Churn": 0
  },
  {
    "Customer_ID": "ed3a6729-d740-48c4-a778-fa2c93b249c4",
    "Name": "Kevin Bennett",
    "Email": "benjaminrosales@example.com",
    "Account_Age_Days": 644,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 17.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "946a67c0-37d4-40a2-a93f-fce64719ac14",
    "Name": "Jason Avila",
    "Email": "xcruz@example.org",
    "Account_Age_Days": 491,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 29.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "2aa6c6ac-29cd-4339-a980-45d54a9e1c01",
    "Name": "Jenna Greene",
    "Email": "scole@example.net",
    "Account_Age_Days": 539,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 53.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "e712a971-51f3-4719-98ae-e7c23834811b",
    "Name": "David Thomas",
    "Email": "david51@example.net",
    "Account_Age_Days": 986,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 23.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 1
  },
  {
    "Customer_ID": "59332ee4-3c32-4aa1-9387-cad2cead7a3d",
    "Name": "Joel Anderson",
    "Email": "brownteresa@example.net",
    "Account_Age_Days": 759,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 7.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 1
  },
  {
    "Customer_ID": "60a5539b-35a0-48b6-b120-73dd9363c902",
    "Name": "Kathryn Frazier",
    "Email": "cspears@example.com",
    "Account_Age_Days": 708,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 118.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "90176b19-8557-409e-b6db-b3d4eb7d7d11",
    "Name": "Lucas Young",
    "Email": "ryoung@example.org",
    "Account_Age_Days": 1008,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 42.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "f3d83220-9c55-4023-8625-ca2683bf61d8",
    "Name": "Misty Brooks",
    "Email": "janet93@example.net",
    "Account_Age_Days": 177,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 15.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 1
  },
  {
    "Customer_ID": "ebbce64b-fad4-48a8-b9d7-d5a7576c3b1e",
    "Name": "Heather Robinson",
    "Email": "nathanbrooks@example.net",
    "Account_Age_Days": 878,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 9.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 0
  },
  {
    "Customer_ID": "1f78d6c3-06a5-48b0-99ed-fd76e7f3aedb",
    "Name": "Julia Mullins",
    "Email": "suzanne77@example.org",
    "Account_Age_Days": 692,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 34.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "031d354b-c73a-4ccc-b8a9-380a0807c1de",
    "Name": "Joe Cohen",
    "Email": "hbarnes@example.com",
    "Account_Age_Days": 289,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 57.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 1
  },
  {
    "Customer_ID": "78629e5c-49f0-4e2c-8f98-4adc3ce61431",
    "Name": "Kathryn Taylor",
    "Email": "anthonyholmes@example.com",
    "Account_Age_Days": 1027,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 38.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "e0dcca02-9d28-45b3-ab54-9d5864d52023",
    "Name": "Lisa French",
    "Email": "perezangela@example.com",
    "Account_Age_Days": 462,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 29.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "7d6a7d77-310e-45d8-9a87-6d3676b42396",
    "Name": "Melissa Thompson",
    "Email": "angelajohnson@example.com",
    "Account_Age_Days": 393,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 104.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 0
  },
  {
    "Customer_ID": "e8dbb0af-ce11-45c6-805c-ead9bc17abcc",
    "Name": "Mark Ritter",
    "Email": "gibbsmaria@example.com",
    "Account_Age_Days": 712,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 54.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "243476f9-df80-4b34-b378-faf1fea9fd48",
    "Name": "Derek Nelson",
    "Email": "jenniferwilliams@example.net",
    "Account_Age_Days": 261,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 37.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "3369a884-5c03-4377-8d1f-dd8bb17b2e61",
    "Name": "Jesse Clark",
    "Email": "aguirrejames@example.com",
    "Account_Age_Days": 856,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 76.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "1c62576f-9192-4287-ade0-532bb7099d00",
    "Name": "Julia Barber",
    "Email": "qbarnes@example.com",
    "Account_Age_Days": 56,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 55.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "06697aee-0867-44cc-9ede-52eb35fe3ee2",
    "Name": "David Jones",
    "Email": "nelsonkaren@example.com",
    "Account_Age_Days": 820,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 56.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 0
  },
  {
    "Customer_ID": "81d8c662-1f70-4c30-a99f-10e847eb0a6d",
    "Name": "Thomas Murphy",
    "Email": "alanmendoza@example.org",
    "Account_Age_Days": 832,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 37.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 1
  },
  {
    "Customer_ID": "fd1c3960-573e-4860-bf5f-2e504ddc170f",
    "Name": "Arthur Wells",
    "Email": "melissa08@example.net",
    "Account_Age_Days": 561,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 23.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "f9602155-c982-46e3-9f2c-6ff76186d506",
    "Name": "Mackenzie Stewart",
    "Email": "vhall@example.org",
    "Account_Age_Days": 210,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 50.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "29cbd288-505d-45d4-bd20-c4f49ebbbc38",
    "Name": "Jonathan Jacobson",
    "Email": "juliacook@example.org",
    "Account_Age_Days": 660,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 33.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "a330f5e7-5003-4d9c-b8e7-3703f7868c27",
    "Name": "Eric Williams",
    "Email": "riggsdavid@example.org",
    "Account_Age_Days": 866,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 3.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 0
  },
  {
    "Customer_ID": "d2cc5cad-ade3-4985-a347-ddf38769d2b8",
    "Name": "Stacy Parker",
    "Email": "huangwilliam@example.com",
    "Account_Age_Days": 847,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 43.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "1b9201e7-99e7-461c-be81-b7922a28d277",
    "Name": "Brian Miller",
    "Email": "amywright@example.com",
    "Account_Age_Days": 717,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 58.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 0
  },
  {
    "Customer_ID": "47e648ea-010a-4607-bfb2-ce3076e7b72a",
    "Name": "Taylor Webster",
    "Email": "laura74@example.net",
    "Account_Age_Days": 13,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 11.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 0
  },
  {
    "Customer_ID": "c7fa72f8-2f38-4862-a987-b4edc2f9fb20",
    "Name": "Jennifer Santos",
    "Email": "ppetersen@example.org",
    "Account_Age_Days": 771,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 13.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 0
  },
  {
    "Customer_ID": "9c549f71-926a-4ac0-9093-9a233ec4600e",
    "Name": "John Golden",
    "Email": "odean@example.org",
    "Account_Age_Days": 949,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 7.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "7b5cd43e-ec5c-4c0a-b34c-b84fed1b0324",
    "Name": "Micheal Mitchell",
    "Email": "barbara72@example.net",
    "Account_Age_Days": 45,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 26.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "e9bba54d-69dd-4472-ae63-36b1d132907c",
    "Name": "Charles Meadows",
    "Email": "xtaylor@example.com",
    "Account_Age_Days": 31,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 47.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "f602cd5e-d109-4fc2-9896-ebcc00326866",
    "Name": "James Roberts",
    "Email": "tbranch@example.com",
    "Account_Age_Days": 619,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 12.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "a6d4c105-bfe0-4801-b207-1e259a99c63c",
    "Name": "Claire Howe",
    "Email": "andrew21@example.com",
    "Account_Age_Days": 607,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 45.0,
    "Last_Support_Ticket": "This tool has saved my team so much time.",
    "Churn": 0
  },
  {
    "Customer_ID": "848a19c6-7332-4526-84e3-e8c339d70689",
    "Name": "Dawn Mcclure",
    "Email": "emilywolfe@example.org",
    "Account_Age_Days": 610,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 42.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "cfaccb50-70dd-42d7-8a3a-b5a9a1a2e5ef",
    "Name": "Rick Price",
    "Email": "sarafigueroa@example.com",
    "Account_Age_Days": 493,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 11.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "88f02fdd-fb6f-4cb0-890e-cc93075a680e",
    "Name": "Brandy Vasquez",
    "Email": "hmeyer@example.com",
    "Account_Age_Days": 310,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 43.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "9391bffb-ce5e-42eb-96d5-06ade40b040b",
    "Name": "John Costa",
    "Email": "wking@example.com",
    "Account_Age_Days": 181,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 36.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "4112be90-c380-4aef-acf8-6f8cf8ae9aeb",
    "Name": "Brian Martinez",
    "Email": "ohall@example.net",
    "Account_Age_Days": 8,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 49.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 1
  },
  {
    "Customer_ID": "389a8f24-ff1b-4aaa-838e-4144f0dd764e",
    "Name": "Richard Edwards",
    "Email": "riveramargaret@example.net",
    "Account_Age_Days": 1001,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 5.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "225276bd-3c75-4eee-a102-449e2a69ee49",
    "Name": "Audrey Sheppard",
    "Email": "joseph42@example.net",
    "Account_Age_Days": 124,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 24.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "0770faad-5068-4b61-9438-2a2e3eb0abfb",
    "Name": "Cynthia Harrison",
    "Email": "osmith@example.net",
    "Account_Age_Days": 295,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 9.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 1
  },
  {
    "Customer_ID": "7040dbe1-3c64-4132-bc4c-064b5aa37f47",
    "Name": "Lindsey Thornton",
    "Email": "taylorle@example.org",
    "Account_Age_Days": 1039,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 107.0,
    "Last_Support_Ticket": "Smooth experience so far, no complaints.",
    "Churn": 0
  },
  {
    "Customer_ID": "503fa887-dea2-4a19-979c-aa5afb280088",
    "Name": "John Smith",
    "Email": "castillosamuel@example.com",
    "Account_Age_Days": 357,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 17.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "94df7f41-6d75-41b1-8f86-8ae152380a9a",
    "Name": "Wayne Suarez",
    "Email": "craigcarolyn@example.com",
    "Account_Age_Days": 42,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 24.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 1
  },
  {
    "Customer_ID": "2168308b-9154-402f-b502-bc2910e31d5f",
    "Name": "Stephanie Peters",
    "Email": "christina56@example.com",
    "Account_Age_Days": 1026,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 27.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "a63357ba-caa9-4ddb-a941-03e3fc844a9a",
    "Name": "Cynthia Soto",
    "Email": "wrhodes@example.net",
    "Account_Age_Days": 234,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 23.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "118e5e5a-ce31-4940-9d33-b8f1ef2edd91",
    "Name": "Stephen Warner",
    "Email": "paulcombs@example.org",
    "Account_Age_Days": 457,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 21.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "770b7ca0-12e9-44c6-9b73-810d34dc8141",
    "Name": "Brandon Vaughan",
    "Email": "robert05@example.com",
    "Account_Age_Days": 289,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 37.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "ad65b0d8-d706-4572-b96e-272d4566dd87",
    "Name": "Lance Simon MD",
    "Email": "maryharris@example.com",
    "Account_Age_Days": 858,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 31.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "48acb123-f942-4db4-9796-2a1881d89af3",
    "Name": "Ashley Johnson",
    "Email": "vcontreras@example.com",
    "Account_Age_Days": 691,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 26.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "e4b26e61-7250-46f5-97fb-3b2fd84f63ef",
    "Name": "Joseph King",
    "Email": "richardsdarrell@example.org",
    "Account_Age_Days": 1069,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 21.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 1
  },
  {
    "Customer_ID": "15e3bcb4-f9c8-4169-b9a6-75bd48ca40ea",
    "Name": "Sean Sawyer",
    "Email": "kevinmoreno@example.net",
    "Account_Age_Days": 952,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 9.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "fc80bef4-4403-4b1a-93a6-05429018dd3a",
    "Name": "Morgan Rangel",
    "Email": "michaelsmith@example.org",
    "Account_Age_Days": 801,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 77.0,
    "Last_Support_Ticket": "Smooth experience so far, no complaints.",
    "Churn": 0
  },
  {
    "Customer_ID": "c67483a9-271a-413d-89e4-db6914dbf596",
    "Name": "Kevin Moore",
    "Email": "williamswilliam@example.org",
    "Account_Age_Days": 680,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 6.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "0401d05c-827f-4063-9512-f86571e18820",
    "Name": "Phillip Mcdonald",
    "Email": "scottjeffrey@example.org",
    "Account_Age_Days": 480,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 83.0,
    "Last_Support_Ticket": "This tool has saved my team so much time.",
    "Churn": 0
  },
  {
    "Customer_ID": "ab00ac94-0403-45ee-8ce7-14ec9de7e991",
    "Name": "Sydney Rogers",
    "Email": "yromero@example.com",
    "Account_Age_Days": 362,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 84.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "1b6aeb80-19b1-4e2c-a645-269c6730c5dc",
    "Name": "Jessica Jones",
    "Email": "barrettsteven@example.net",
    "Account_Age_Days": 640,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 57.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "643de5bd-3bf0-4bc0-a714-773490483489",
    "Name": "Steven Smith",
    "Email": "victoria16@example.net",
    "Account_Age_Days": 170,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 35.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "154e6baf-83d7-401f-bdf3-83b902fb7d7e",
    "Name": "Jennifer Miller",
    "Email": "thomasdawn@example.org",
    "Account_Age_Days": 107,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 55.0,
    "Last_Support_Ticket": "Smooth experience so far, no complaints.",
    "Churn": 0
  },
  {
    "Customer_ID": "1b869a35-adb9-4b86-9cca-5a9ed578a44c",
    "Name": "Marcia Dickson",
    "Email": "hollywade@example.net",
    "Account_Age_Days": 839,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 39.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "ac9b3fca-e4bb-45f6-a700-8246616ed708",
    "Name": "Paul Morris",
    "Email": "kendramcdowell@example.com",
    "Account_Age_Days": 1007,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 3.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 1
  },
  {
    "Customer_ID": "7eede3cc-f27e-4252-b12e-d9b6115b9eb8",
    "Name": "Amber Lowe",
    "Email": "williammiller@example.com",
    "Account_Age_Days": 412,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 94.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "fac17453-534c-4d66-b9cb-5e1caeca9e0e",
    "Name": "Sheila Maxwell",
    "Email": "kcox@example.com",
    "Account_Age_Days": 795,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 43.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "1994c824-994d-40f3-a628-2c532b61dbd0",
    "Name": "Melanie Cline",
    "Email": "villamartin@example.org",
    "Account_Age_Days": 457,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 50.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "e53524d7-9f87-46df-8fbf-4291df985325",
    "Name": "Devin Turner",
    "Email": "williamsmith@example.com",
    "Account_Age_Days": 762,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 31.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "b79038fa-2c24-4a31-9514-4460b4d8de5e",
    "Name": "Shawna Valdez",
    "Email": "dustin58@example.net",
    "Account_Age_Days": 894,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 38.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 1
  },
  {
    "Customer_ID": "2be0b323-87cf-4dc8-bfa9-48a28c1e3a7e",
    "Name": "Angela Rich",
    "Email": "qdecker@example.org",
    "Account_Age_Days": 865,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 29.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 1
  },
  {
    "Customer_ID": "6e02414c-71fa-4def-946d-28340b04879c",
    "Name": "Ariel Allen",
    "Email": "beverlyhudson@example.net",
    "Account_Age_Days": 302,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 50.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 1
  },
  {
    "Customer_ID": "5a5eb952-0a8b-4505-94ea-0b20b11c86e7",
    "Name": "Danielle Taylor",
    "Email": "cruzangela@example.net",
    "Account_Age_Days": 887,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 20.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "181b3da0-ecd6-4d0a-add8-be2ca2b3d565",
    "Name": "Tony Anderson",
    "Email": "davidtorres@example.com",
    "Account_Age_Days": 762,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 12.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "a3d3fabf-2f31-4b12-8a05-774f311c42b8",
    "Name": "Mrs. Christine Kline",
    "Email": "joseflores@example.net",
    "Account_Age_Days": 173,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 45.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 1
  },
  {
    "Customer_ID": "c882f4ff-2580-4a91-8159-1695be59e0da",
    "Name": "Richard Tyler",
    "Email": "erice@example.org",
    "Account_Age_Days": 1072,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 5.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 0
  },
  {
    "Customer_ID": "29d547a7-5d93-46bc-a07c-470adca87cb5",
    "Name": "Adam Miller",
    "Email": "cortezhenry@example.com",
    "Account_Age_Days": 689,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 19.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 1
  },
  {
    "Customer_ID": "8202cfe9-9386-4c76-8880-cd8f1865180e",
    "Name": "April Brown",
    "Email": "bevans@example.net",
    "Account_Age_Days": 1049,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 33.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "ba6eef7b-4c70-4b57-8e4b-2383cce4193c",
    "Name": "Margaret Vega",
    "Email": "nsanchez@example.com",
    "Account_Age_Days": 250,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 46.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "adce29e5-8343-43c1-8f96-1af5aa1cd569",
    "Name": "Laura Shepherd",
    "Email": "berryjeffrey@example.com",
    "Account_Age_Days": 811,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 50.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "41bfd6d1-12c4-4443-a9d5-bf5a20f5e71e",
    "Name": "Nicole Lloyd",
    "Email": "dixoneric@example.com",
    "Account_Age_Days": 819,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 83.0,
    "Last_Support_Ticket": "I love the new analytics feature! Great job.",
    "Churn": 0
  },
  {
    "Customer_ID": "52e432c2-d52c-4667-9471-a72fa6d8864f",
    "Name": "Scott Allen",
    "Email": "mhamilton@example.com",
    "Account_Age_Days": 250,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 8.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "622773df-6575-4c4a-a10f-071cea37e060",
    "Name": "Rachel Peters",
    "Email": "katherinebrown@example.com",
    "Account_Age_Days": 423,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 37.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "9ef9c227-1864-4dbc-a6dd-d8e5ff5989d8",
    "Name": "David Ortiz",
    "Email": "tylerjeffrey@example.com",
    "Account_Age_Days": 21,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 58.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 1
  },
  {
    "Customer_ID": "c3882213-bc7e-496e-b9a9-f7304c289840",
    "Name": "Susan Walker",
    "Email": "smithmatthew@example.net",
    "Account_Age_Days": 1084,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 24.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "82f3df40-5cf0-4999-854d-870a89a13ff0",
    "Name": "John Estes",
    "Email": "rodriguezashley@example.com",
    "Account_Age_Days": 999,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 24.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "bef9b510-baad-43ab-b311-da43f2c0ed39",
    "Name": "Brian Griffin",
    "Email": "johnnymartinez@example.com",
    "Account_Age_Days": 579,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 55.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "9780f404-af05-4d70-bcc1-f4a2f7dc578e",
    "Name": "Sarah Flores",
    "Email": "burtoncharles@example.com",
    "Account_Age_Days": 942,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 91.0,
    "Last_Support_Ticket": "Smooth experience so far, no complaints.",
    "Churn": 0
  },
  {
    "Customer_ID": "14a85366-0955-4f11-8eca-f6de92dc01c5",
    "Name": "Gloria Phillips",
    "Email": "higginsedward@example.net",
    "Account_Age_Days": 1051,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 12.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "c06bf9fa-bcf6-49d2-bc9f-923086e6d29f",
    "Name": "Donna Cruz",
    "Email": "michael11@example.com",
    "Account_Age_Days": 723,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 15.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "2545909b-d493-4975-88d0-02ba96947319",
    "Name": "Julie Yates",
    "Email": "riosandrea@example.net",
    "Account_Age_Days": 308,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 10.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "dfdc423c-cc23-49dd-85ea-7339db56cf5e",
    "Name": "Mary Hayes",
    "Email": "gardnerjames@example.net",
    "Account_Age_Days": 361,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 41.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 1
  },
  {
    "Customer_ID": "3cca0860-8c09-400a-ac71-370cf2e6562f",
    "Name": "Jonathan Rivera",
    "Email": "hilljoseph@example.net",
    "Account_Age_Days": 482,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 35.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "4ae2aef1-fb3a-4b9d-ac9f-803574e6cabd",
    "Name": "Heather Gaines",
    "Email": "marchatfield@example.org",
    "Account_Age_Days": 687,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 15.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "e21ce3d4-09a8-45b0-8e66-530d4c4b3b68",
    "Name": "Danny Morris",
    "Email": "dillon96@example.com",
    "Account_Age_Days": 623,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 63.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "3e4b74c6-bd39-46bd-ab7a-930e64936739",
    "Name": "David Jones",
    "Email": "jeremygarcia@example.com",
    "Account_Age_Days": 1058,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 11.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "933563df-14e8-4135-a45a-c418e18a2cc7",
    "Name": "Alex Johnson",
    "Email": "jamiemendoza@example.org",
    "Account_Age_Days": 891,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 30.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "50faf310-9296-49c2-8296-fcb0b32cc89a",
    "Name": "Jose Bennett",
    "Email": "tthomas@example.net",
    "Account_Age_Days": 262,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 51.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "41090716-9deb-4e2e-9060-abf250008eb5",
    "Name": "Jesus Stewart",
    "Email": "ericbeasley@example.com",
    "Account_Age_Days": 1089,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 54.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 1
  },
  {
    "Customer_ID": "14b9a3c4-f82b-4421-842e-0051696a6130",
    "Name": "Heather Greer",
    "Email": "george27@example.net",
    "Account_Age_Days": 917,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 29.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "d97868d5-b956-4886-bf8e-6b41d9dc2161",
    "Name": "Michael Guzman",
    "Email": "david19@example.com",
    "Account_Age_Days": 172,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 12.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 1
  },
  {
    "Customer_ID": "04784b2a-a3a0-4179-afd8-1d7ceea07770",
    "Name": "Brittany Craig",
    "Email": "coleryan@example.com",
    "Account_Age_Days": 253,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 71.0,
    "Last_Support_Ticket": "Smooth experience so far, no complaints.",
    "Churn": 0
  },
  {
    "Customer_ID": "bf24037f-97b9-445a-932e-6840f5ca5aa0",
    "Name": "Brian Holmes",
    "Email": "michaelandrew@example.com",
    "Account_Age_Days": 1042,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 42.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 1
  },
  {
    "Customer_ID": "931f826c-5cba-4cf5-bd0a-567c8baa226d",
    "Name": "Carla Hill",
    "Email": "jasmine37@example.net",
    "Account_Age_Days": 590,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 71.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 0
  },
  {
    "Customer_ID": "68a0c12d-95d6-4f71-aec8-ace90be90a5a",
    "Name": "Eugene Pittman",
    "Email": "qduke@example.net",
    "Account_Age_Days": 849,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 64.0,
    "Last_Support_Ticket": "I love the new analytics feature! Great job.",
    "Churn": 0
  },
  {
    "Customer_ID": "8c9bb1ae-43ff-4480-9321-219c46f33110",
    "Name": "Amy Rose",
    "Email": "kevin04@example.org",
    "Account_Age_Days": 995,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 13.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "19b5e8a0-3798-425b-bb07-0d8e79708bb2",
    "Name": "Aaron Marshall",
    "Email": "marywhite@example.net",
    "Account_Age_Days": 576,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 50.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 1
  },
  {
    "Customer_ID": "54d95fe0-9679-44a2-873c-63745e2207b8",
    "Name": "Maurice Fernandez",
    "Email": "elizabeth54@example.org",
    "Account_Age_Days": 708,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 13.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 0
  },
  {
    "Customer_ID": "59b99135-b28f-470c-bbe9-1d1ffbb7f23c",
    "Name": "Michelle Olson",
    "Email": "flemingearl@example.com",
    "Account_Age_Days": 886,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 38.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "d42a6dd7-f31d-4338-bbed-63f621ac4e3d",
    "Name": "Wayne Espinoza",
    "Email": "cody60@example.net",
    "Account_Age_Days": 9,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 55.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "48a468a1-c91c-4be8-870d-23d6c0d5b49b",
    "Name": "Catherine Moore",
    "Email": "bushkirsten@example.net",
    "Account_Age_Days": 395,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 31.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "0cd136c8-dfba-4275-9414-c4aad7534e0b",
    "Name": "Gabriel Stein",
    "Email": "kentedward@example.org",
    "Account_Age_Days": 861,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 45.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "b3a28d24-7520-465a-9ea1-5d632e4b8ede",
    "Name": "Katrina Rich",
    "Email": "brandihampton@example.org",
    "Account_Age_Days": 263,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 89.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 0
  },
  {
    "Customer_ID": "f59dcd19-56e1-4e1f-8bf2-8b5be1be5019",
    "Name": "Kenneth Adams",
    "Email": "washingtonglen@example.com",
    "Account_Age_Days": 837,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 21.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "013e6438-c04e-4b53-ad83-7dcbf19b3d75",
    "Name": "Samantha Bradley",
    "Email": "laura79@example.net",
    "Account_Age_Days": 905,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 36.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "70408537-98bb-49ef-b599-d8b581d4a95b",
    "Name": "Brandon Garcia",
    "Email": "romeronicole@example.com",
    "Account_Age_Days": 1008,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 27.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "6332f1ae-18c6-4031-aad5-ef8d6212281e",
    "Name": "Gregory Davis",
    "Email": "oscar99@example.net",
    "Account_Age_Days": 536,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 1.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 0
  },
  {
    "Customer_ID": "70935943-baae-4eab-93df-867534b04574",
    "Name": "James Campbell",
    "Email": "veronicasmith@example.net",
    "Account_Age_Days": 268,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 2.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "34695107-920e-49e3-b402-33a9dbb98e02",
    "Name": "Michael Montes",
    "Email": "ricardo20@example.net",
    "Account_Age_Days": 315,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 20.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "9b02d5d7-5add-455b-9a7e-5ac73eaf5ab8",
    "Name": "Timothy May",
    "Email": "kingdawn@example.org",
    "Account_Age_Days": 698,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 5.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "1d52ec1a-6b20-4e03-9044-19b0bab1ea0d",
    "Name": "Andrew Richardson",
    "Email": "williamsjoseph@example.org",
    "Account_Age_Days": 911,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 13.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "f35b6e94-e65b-41f3-950b-d8e576ba15ad",
    "Name": "John Young",
    "Email": "marc01@example.org",
    "Account_Age_Days": 504,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 45.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "7b4d57a7-1d5b-4a80-b11f-a2abf2606aa1",
    "Name": "Pamela Harper",
    "Email": "oharper@example.net",
    "Account_Age_Days": 793,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 24.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "44051812-c502-49f8-be5a-9c63619d504d",
    "Name": "Judith Rodriguez",
    "Email": "beverly86@example.org",
    "Account_Age_Days": 400,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 2.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 0
  },
  {
    "Customer_ID": "d0751661-3bad-42af-9088-3b74f41e9d8a",
    "Name": "Rhonda Allen",
    "Email": "nlynch@example.com",
    "Account_Age_Days": 418,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 2.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "98b64fcb-ab11-4bbb-8e4c-edfb9e02beb1",
    "Name": "Alison Johnson",
    "Email": "harrismatthew@example.net",
    "Account_Age_Days": 421,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 36.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 1
  },
  {
    "Customer_ID": "a9843162-488c-4b52-b441-bc516442a8a9",
    "Name": "Joshua Burgess",
    "Email": "angela34@example.com",
    "Account_Age_Days": 440,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 47.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "5ba727ac-1203-4add-8f0c-5469f8f040b3",
    "Name": "Zachary Reed",
    "Email": "mcisneros@example.org",
    "Account_Age_Days": 1014,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 70.0,
    "Last_Support_Ticket": "Smooth experience so far, no complaints.",
    "Churn": 0
  },
  {
    "Customer_ID": "8e8639af-fccc-4acc-8e61-b75d447327e9",
    "Name": "Michael Gray",
    "Email": "banksmichelle@example.net",
    "Account_Age_Days": 828,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 15.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "2e5c1842-a6fa-4c6c-bfe5-5b2a89c8aed8",
    "Name": "James Cook",
    "Email": "brandonbeard@example.com",
    "Account_Age_Days": 644,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 3.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 0
  },
  {
    "Customer_ID": "fa2b1b1a-40d8-4919-a58d-9bf14181c68e",
    "Name": "Barbara Chavez",
    "Email": "thomasarnold@example.net",
    "Account_Age_Days": 69,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 55.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "429a215a-ddc4-482a-b109-294a090046c1",
    "Name": "Karen Mills",
    "Email": "rojaskristin@example.net",
    "Account_Age_Days": 669,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 17.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "e13e7d7f-6712-4182-8906-e51b99a0f5c3",
    "Name": "Derek Palmer",
    "Email": "sheila62@example.net",
    "Account_Age_Days": 103,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 8.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "4360bf44-7eab-437f-bb0b-2f6878cdd302",
    "Name": "Sarah Jefferson",
    "Email": "nicolegallagher@example.com",
    "Account_Age_Days": 902,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 16.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 1
  },
  {
    "Customer_ID": "d62a10db-1ae3-4111-88b9-327ea2b68f79",
    "Name": "Nicole Hicks",
    "Email": "cjones@example.com",
    "Account_Age_Days": 690,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 54.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "753bc92d-b4bb-4f74-a876-adec3d8dc250",
    "Name": "Kristen Lopez",
    "Email": "williamstonya@example.net",
    "Account_Age_Days": 851,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 71.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 1
  },
  {
    "Customer_ID": "e3a6cf3a-b389-47f8-92f9-c96ebc91f900",
    "Name": "Richard Williamson",
    "Email": "fescobar@example.com",
    "Account_Age_Days": 463,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 24.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 1
  },
  {
    "Customer_ID": "7656b46d-839a-446c-8545-996ad94a3368",
    "Name": "Nathan Taylor",
    "Email": "meganday@example.net",
    "Account_Age_Days": 559,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 28.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "d167ccc1-c479-44e2-a61e-50a1e023330e",
    "Name": "Sarah West",
    "Email": "kayla98@example.net",
    "Account_Age_Days": 923,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 29.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "44af8e37-79e2-4f82-be42-3552f8fb265c",
    "Name": "Susan Brown",
    "Email": "xfreeman@example.net",
    "Account_Age_Days": 385,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 6.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "1d06867a-4cbe-436e-bdb3-73ca27ae6fe3",
    "Name": "Amy Lowe",
    "Email": "donnaperkins@example.org",
    "Account_Age_Days": 318,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 13.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "caf4827b-c1a9-4591-b316-8bc36059269b",
    "Name": "Jason Conway",
    "Email": "danieltorres@example.com",
    "Account_Age_Days": 1060,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 14.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "a3c2d987-8317-4b71-85cf-ffcf695667eb",
    "Name": "Joshua Hernandez",
    "Email": "alec87@example.com",
    "Account_Age_Days": 215,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 28.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "0eee4e2b-2429-44a2-8936-bf954b4d031a",
    "Name": "Jeffrey Eaton",
    "Email": "ajackson@example.org",
    "Account_Age_Days": 8,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 30.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 1
  },
  {
    "Customer_ID": "454d4791-0778-4060-900b-8e00d737f05a",
    "Name": "Deanna Davis",
    "Email": "xhansen@example.com",
    "Account_Age_Days": 766,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 27.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "9efe8116-728f-489a-9552-ff7426ca6431",
    "Name": "Robert Ruiz",
    "Email": "patrickmeadows@example.com",
    "Account_Age_Days": 714,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 9.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "9ad9c1d0-7374-47f8-9280-3130cc7b32bb",
    "Name": "Austin Love",
    "Email": "jgutierrez@example.com",
    "Account_Age_Days": 319,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 15.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "5f045765-69ad-40e7-9fd3-28afe2c6cf4e",
    "Name": "Gary Petty",
    "Email": "karenmunoz@example.org",
    "Account_Age_Days": 352,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 27.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "d4b5096b-14ba-4028-8d30-162c71f7dffb",
    "Name": "Joshua Thompson",
    "Email": "paulalane@example.net",
    "Account_Age_Days": 427,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 1.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "338fe9e8-c4f9-4401-a371-274835d3c2c0",
    "Name": "Alan Wright",
    "Email": "christophercole@example.com",
    "Account_Age_Days": 466,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 35.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 0
  },
  {
    "Customer_ID": "fecd0a4b-6570-4f50-a86a-e399376c4219",
    "Name": "Jennifer Bartlett",
    "Email": "kward@example.net",
    "Account_Age_Days": 205,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 11.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "36f95465-6306-46ae-b279-2b71113b1934",
    "Name": "Diana Gonzalez",
    "Email": "powelllisa@example.com",
    "Account_Age_Days": 803,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 54.0,
    "Last_Support_Ticket": "This tool has saved my team so much time.",
    "Churn": 0
  },
  {
    "Customer_ID": "4c9c9344-e43c-469c-880d-1fa965bd48cb",
    "Name": "Dennis House",
    "Email": "tinamartinez@example.com",
    "Account_Age_Days": 983,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 24.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "fd1f9e8a-a263-42c4-8f96-835e30e0dd73",
    "Name": "Felicia Myers",
    "Email": "cynthia66@example.org",
    "Account_Age_Days": 898,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 9.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "1148cd8b-4dee-4dae-8efd-7e1f0d519360",
    "Name": "Julie Smith",
    "Email": "michaelwhite@example.org",
    "Account_Age_Days": 41,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 4.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "b24854f9-cba8-4ffc-a9e9-12647c0b2090",
    "Name": "Robert Sampson",
    "Email": "ruizdeborah@example.com",
    "Account_Age_Days": 697,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 26.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "dcfb665c-841b-4134-8293-2772b5b45fb0",
    "Name": "Jonathon Ryan",
    "Email": "michellevasquez@example.net",
    "Account_Age_Days": 679,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 15.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "de6317d1-37a4-4d8c-85f2-ae9f197bd82c",
    "Name": "Julie Humphrey",
    "Email": "andrea57@example.com",
    "Account_Age_Days": 821,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 15.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "367d78e0-015a-4c33-9c86-c2c6cfc5408f",
    "Name": "Allen Cooper",
    "Email": "brittanycallahan@example.com",
    "Account_Age_Days": 568,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 13.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "7f4ab3b9-c0ed-4994-9a99-9f1a3fcdc288",
    "Name": "Michelle Jenkins",
    "Email": "perezdavid@example.com",
    "Account_Age_Days": 258,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 77.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "b2cb5008-ca25-47d1-badf-8f236e31d1af",
    "Name": "Donna Thomas",
    "Email": "vincentjames@example.com",
    "Account_Age_Days": 827,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 106.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "df5805bd-b53e-45d5-ad2e-3d4c52b2dea0",
    "Name": "Dustin Merritt",
    "Email": "robinsonpatty@example.org",
    "Account_Age_Days": 532,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 55.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "4170c9d8-86f3-4522-95b0-2e5aac756ae9",
    "Name": "James Flores",
    "Email": "belljon@example.net",
    "Account_Age_Days": 570,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 19.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "8897c084-93c8-46fb-9926-9e46a64699a0",
    "Name": "Colin Gilbert",
    "Email": "lsmith@example.net",
    "Account_Age_Days": 96,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 27.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "54f61f27-9c62-41a0-8bca-3f1cf65969e9",
    "Name": "John Combs DDS",
    "Email": "robert59@example.org",
    "Account_Age_Days": 97,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 98.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 0
  },
  {
    "Customer_ID": "8ee4b203-00ee-4018-940c-04f5b81d54df",
    "Name": "Larry Henry",
    "Email": "yferguson@example.com",
    "Account_Age_Days": 72,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 17.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "0b7cede2-b412-4ac7-8f21-01b27ae2cdd9",
    "Name": "Courtney Dominguez",
    "Email": "gabrielagoodman@example.org",
    "Account_Age_Days": 207,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 4.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "85ba2008-ade5-4d0e-8f94-e38f06479f9b",
    "Name": "Michelle Cruz",
    "Email": "hurstsarah@example.org",
    "Account_Age_Days": 455,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 60.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "3b45cd52-ff82-4044-b07f-c6f29281b3a8",
    "Name": "Taylor Fowler",
    "Email": "ihill@example.org",
    "Account_Age_Days": 688,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 46.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "b977af3e-e479-4617-ac0b-88187eaf548a",
    "Name": "Raymond Moore",
    "Email": "monteschristine@example.net",
    "Account_Age_Days": 19,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 47.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 1
  },
  {
    "Customer_ID": "c7ea3a8c-92a7-48ce-9084-191367467a7e",
    "Name": "Andrea Arias",
    "Email": "baileyjohn@example.net",
    "Account_Age_Days": 492,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 2.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "86172569-9107-4abb-90b7-5a22d94f91d9",
    "Name": "William Kaufman",
    "Email": "pmorales@example.org",
    "Account_Age_Days": 457,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 22.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "fcf76ccc-2c92-4449-9f29-0a62528d82be",
    "Name": "George Miller",
    "Email": "middletonjason@example.org",
    "Account_Age_Days": 929,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 61.0,
    "Last_Support_Ticket": "Smooth experience so far, no complaints.",
    "Churn": 0
  },
  {
    "Customer_ID": "204b2736-4e6c-47b2-b8e9-d90fc4f1f6d4",
    "Name": "Mathew Erickson",
    "Email": "qanderson@example.org",
    "Account_Age_Days": 127,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 46.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "7e307aae-8046-4514-a182-50ca4ea696c5",
    "Name": "Paula Williams",
    "Email": "jacksonlarry@example.net",
    "Account_Age_Days": 552,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 87.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 0
  },
  {
    "Customer_ID": "ff8c6fe5-278b-4f15-8dea-50545e3c3c39",
    "Name": "Kimberly Suarez",
    "Email": "rkane@example.net",
    "Account_Age_Days": 733,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 24.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 1
  },
  {
    "Customer_ID": "4ca2e81b-1151-4321-afec-cf037cd4614d",
    "Name": "Veronica Zamora",
    "Email": "emartin@example.org",
    "Account_Age_Days": 576,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 26.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "0214ab85-681c-4f7d-af0d-c9aa66760379",
    "Name": "Mrs. Leah Moore",
    "Email": "emorrison@example.net",
    "Account_Age_Days": 477,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 89.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "48b52f15-ea24-45d4-9ca7-01b6f1c87d89",
    "Name": "Maurice Evans",
    "Email": "benjamin68@example.net",
    "Account_Age_Days": 442,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 9.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "3bb8ca52-7c9e-4c45-9b8d-5531daed289e",
    "Name": "Joshua Murphy",
    "Email": "rgarcia@example.org",
    "Account_Age_Days": 579,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 52.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "821d666c-58b5-4ce7-809b-ac8b345e97d2",
    "Name": "Kelly Scott",
    "Email": "katherinemcguire@example.com",
    "Account_Age_Days": 865,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 42.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "832b2b52-6547-4a21-8ba1-5938836896c2",
    "Name": "Mr. David Stout",
    "Email": "gwest@example.org",
    "Account_Age_Days": 649,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 82.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "500c85a7-86d8-4eba-9025-43f086315413",
    "Name": "Stephanie Smith",
    "Email": "bethanykelley@example.net",
    "Account_Age_Days": 18,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 60.0,
    "Last_Support_Ticket": "This tool has saved my team so much time.",
    "Churn": 0
  },
  {
    "Customer_ID": "a7be8913-abe2-421b-ab59-c10350b3c9ce",
    "Name": "Amy Kane",
    "Email": "karensalazar@example.org",
    "Account_Age_Days": 598,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 52.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "244ac984-22e6-4094-be76-7276ee4e9b03",
    "Name": "Michael Giles DVM",
    "Email": "robert41@example.com",
    "Account_Age_Days": 285,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 37.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "aa61443f-9534-41d7-b196-c491d7f48575",
    "Name": "Melissa Martin",
    "Email": "shepherdtaylor@example.org",
    "Account_Age_Days": 1052,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 9.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "c122e05e-2760-4e0b-a42a-0e11f68e9c45",
    "Name": "Ashley Fuller",
    "Email": "xwolfe@example.net",
    "Account_Age_Days": 539,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 2.0,
    "Last_Support_Ticket": "The UI is too confusing. I can't find the export button.",
    "Churn": 1
  },
  {
    "Customer_ID": "125b4bdd-74aa-496f-86f5-8ad62f3cfedb",
    "Name": "Melissa Smith",
    "Email": "jamesdarlene@example.net",
    "Account_Age_Days": 179,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 54.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "99698678-9b95-4150-b797-beb3d168f033",
    "Name": "Alexander Serrano",
    "Email": "jessicasanchez@example.net",
    "Account_Age_Days": 213,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 33.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "14ba4085-3c92-45a8-8a4a-1e92ad2c16f9",
    "Name": "Patrick Nash",
    "Email": "perkinsadam@example.net",
    "Account_Age_Days": 305,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 12.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "e96a63db-ca8f-4bd1-b425-e648b2b8c1ac",
    "Name": "Sarah Washington",
    "Email": "loriblack@example.net",
    "Account_Age_Days": 13,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 34.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "1382dd85-2857-49f4-93ea-2c8c19788d97",
    "Name": "Tammy Smith",
    "Email": "brandon07@example.net",
    "Account_Age_Days": 628,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 6.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "89f00b73-80a6-4d69-bb40-808d1f740cad",
    "Name": "Michelle Fisher",
    "Email": "rwagner@example.org",
    "Account_Age_Days": 680,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 56.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "f545b3fe-9ed9-445d-bf00-e9bff7f1463b",
    "Name": "Edward Bennett",
    "Email": "jesus65@example.net",
    "Account_Age_Days": 116,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 13.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "5cff158e-2f99-4f05-9ca0-d1c337ed5b24",
    "Name": "Peter Cook",
    "Email": "rachel87@example.com",
    "Account_Age_Days": 63,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 47.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "55060136-af1c-4f75-9d76-6cc09e776c1a",
    "Name": "Mackenzie George",
    "Email": "carolhogan@example.org",
    "Account_Age_Days": 25,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 52.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 1
  },
  {
    "Customer_ID": "b124eb5f-98a0-4a73-a6c7-3236c6e05dcf",
    "Name": "Roger Underwood",
    "Email": "emilyunderwood@example.org",
    "Account_Age_Days": 478,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 5.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "3e3a8fa9-1348-4570-9953-8d597c117a86",
    "Name": "Hunter Williamson",
    "Email": "eric49@example.net",
    "Account_Age_Days": 895,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 114.0,
    "Last_Support_Ticket": "This tool has saved my team so much time.",
    "Churn": 0
  },
  {
    "Customer_ID": "df6e3b15-c777-4cbc-a640-12e0bb99d972",
    "Name": "Christopher Rosario",
    "Email": "catherinereyes@example.com",
    "Account_Age_Days": 621,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 22.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 1
  },
  {
    "Customer_ID": "ca3c77fc-e252-4ea9-86b1-ef77b0a903ee",
    "Name": "Joyce Baker",
    "Email": "jonathanelliott@example.com",
    "Account_Age_Days": 24,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 46.0,
    "Last_Support_Ticket": "Is there a tutorial for the new dashboard feature?",
    "Churn": 0
  },
  {
    "Customer_ID": "b6eda50f-ea49-4699-805e-aaf515486bc6",
    "Name": "Dr. Dennis White",
    "Email": "chaserobin@example.net",
    "Account_Age_Days": 118,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 38.0,
    "Last_Support_Ticket": "How do I change my password?",
    "Churn": 1
  },
  {
    "Customer_ID": "8b872c28-feb1-469e-a4ff-98f567b286ac",
    "Name": "Gregory Mueller",
    "Email": "susanmason@example.com",
    "Account_Age_Days": 657,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 44.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "819b5f88-ca09-41f9-8312-10d2fc735962",
    "Name": "Austin Ramirez",
    "Email": "oconnellcrystal@example.net",
    "Account_Age_Days": 16,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 19.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "6469324d-e210-4093-a457-030afe16135a",
    "Name": "Darren Walsh",
    "Email": "molly55@example.org",
    "Account_Age_Days": 944,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 55.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 1
  },
  {
    "Customer_ID": "941eb382-a892-4f3d-a860-9ea95d66c3b1",
    "Name": "Drew Taylor",
    "Email": "anthonydowns@example.com",
    "Account_Age_Days": 842,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 20.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "ac53d453-659d-4761-8a73-8fea7075e7c4",
    "Name": "Chris Durham",
    "Email": "sperez@example.com",
    "Account_Age_Days": 39,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 47.0,
    "Last_Support_Ticket": "This tool has saved my team so much time.",
    "Churn": 0
  },
  {
    "Customer_ID": "7f879793-f1ee-448d-9e8f-c8367c11450c",
    "Name": "Tyler Brandt",
    "Email": "calvin11@example.net",
    "Account_Age_Days": 192,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 49.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "d5fc6b5b-4775-447a-b49b-721d107c2581",
    "Name": "James Taylor",
    "Email": "tabitha36@example.com",
    "Account_Age_Days": 608,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 8.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "02e1e4b2-45f4-48d0-862b-518263a4f27f",
    "Name": "Tara Anderson",
    "Email": "jessemccullough@example.org",
    "Account_Age_Days": 38,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 20.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "3f17364b-591b-43cd-864e-5875b1c096f6",
    "Name": "Laura Gibson",
    "Email": "angela69@example.com",
    "Account_Age_Days": 527,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 54.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "52c4ada2-1767-4de0-b3f4-4e091202f9ea",
    "Name": "David Mckee MD",
    "Email": "qsilva@example.net",
    "Account_Age_Days": 16,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 11.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 1
  },
  {
    "Customer_ID": "95bf7f0d-0cf4-4b2d-a68d-dc59760ce447",
    "Name": "Adam Thomas MD",
    "Email": "josephherrera@example.net",
    "Account_Age_Days": 1032,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 36.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "fa0833c0-cb3c-4d4a-b708-bfbe9ccc51b4",
    "Name": "Sydney Serrano",
    "Email": "amandathomas@example.org",
    "Account_Age_Days": 1038,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 36.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 1
  },
  {
    "Customer_ID": "c005de62-773d-49c6-9381-82420e015505",
    "Name": "Patrick Arroyo",
    "Email": "kylejames@example.net",
    "Account_Age_Days": 380,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 110.0,
    "Last_Support_Ticket": "Customer support was super helpful yesterday. Thanks!",
    "Churn": 0
  },
  {
    "Customer_ID": "b00461b7-cae5-4eee-8431-270057024493",
    "Name": "Thomas Hartman",
    "Email": "nicholsrichard@example.net",
    "Account_Age_Days": 525,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 36.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "8987389f-5238-4d53-8c26-0d4c6992a175",
    "Name": "Christopher Pittman",
    "Email": "william02@example.net",
    "Account_Age_Days": 811,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 40.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "b4c2904b-e80c-40e8-a3cf-9b03d2f00e4a",
    "Name": "Charles Grant",
    "Email": "elizabeth20@example.net",
    "Account_Age_Days": 314,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 2.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 1
  },
  {
    "Customer_ID": "c8190a49-1ef9-4bd7-87c0-44d2504fbfa8",
    "Name": "Katherine Bolton",
    "Email": "hollysmith@example.org",
    "Account_Age_Days": 1007,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 33.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "ef96e574-d80d-4c17-b38b-3c5f72b9e5c6",
    "Name": "Stephanie Smith",
    "Email": "phillipcox@example.net",
    "Account_Age_Days": 324,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 48.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  },
  {
    "Customer_ID": "758d8e97-3015-4ba1-9cb0-0fc4ed032e9e",
    "Name": "Daniel Brown",
    "Email": "eproctor@example.com",
    "Account_Age_Days": 518,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 39.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "0ab745b1-c477-4a6c-a43f-040c3f0e2bc6",
    "Name": "Evan Allen",
    "Email": "nathanpatton@example.com",
    "Account_Age_Days": 505,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 58.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "8cc545e2-26ef-4d69-a652-53397e23189d",
    "Name": "Dustin Williams",
    "Email": "williamschristina@example.org",
    "Account_Age_Days": 134,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 5.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 0
  },
  {
    "Customer_ID": "545a2b58-507b-4895-9058-ab77bbdbe67a",
    "Name": "Mark Walker",
    "Email": "lphillips@example.com",
    "Account_Age_Days": 184,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 5.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "a8159099-fe07-4b66-a980-db126a5906f3",
    "Name": "Willie Rogers",
    "Email": "mmarquez@example.org",
    "Account_Age_Days": 441,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 6.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "6a541d63-12b2-4288-96c1-c943458cb903",
    "Name": "David Collins",
    "Email": "emily45@example.com",
    "Account_Age_Days": 267,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 72.0,
    "Last_Support_Ticket": "The integration with Slack works perfectly.",
    "Churn": 0
  },
  {
    "Customer_ID": "e82e9a34-bc75-4ca9-b3f9-4d909d877658",
    "Name": "Heidi Hernandez",
    "Email": "lfranklin@example.org",
    "Account_Age_Days": 343,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 42.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "b07a3760-1e8b-4df6-8121-f361497b9610",
    "Name": "Amy Huffman",
    "Email": "garzawilliam@example.org",
    "Account_Age_Days": 655,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 3.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 0
  },
  {
    "Customer_ID": "80f2a438-189b-4e9a-9f00-5c4e688acc57",
    "Name": "Dawn Lewis",
    "Email": "jgriffin@example.com",
    "Account_Age_Days": 986,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 12.0,
    "Last_Support_Ticket": "Your API documentation is outdated and full of errors.",
    "Churn": 1
  },
  {
    "Customer_ID": "93ef13dd-94a8-4a30-83f6-2560a0bbd895",
    "Name": "Kelsey Duarte",
    "Email": "lindsaymartinez@example.com",
    "Account_Age_Days": 26,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 10.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "1e620e08-a235-40f4-8243-eb1033cb53bf",
    "Name": "Marissa Gray",
    "Email": "saundersheidi@example.net",
    "Account_Age_Days": 741,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 41.0,
    "Last_Support_Ticket": "Just checking if my payment went through.",
    "Churn": 0
  },
  {
    "Customer_ID": "c88d1d7f-8316-4eae-82db-de764fca8d6f",
    "Name": "Charles Lindsey",
    "Email": "dickersonrobert@example.net",
    "Account_Age_Days": 1009,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 41.0,
    "Last_Support_Ticket": "I need to update my billing address.",
    "Churn": 0
  },
  {
    "Customer_ID": "22a53db1-bcbe-4265-a0e0-de8b2be68249",
    "Name": "Jeffrey Clark",
    "Email": "gwilliams@example.com",
    "Account_Age_Days": 301,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 5.0,
    "Last_Support_Ticket": "The app crashes every time I try to upload a CSV.",
    "Churn": 0
  },
  {
    "Customer_ID": "12d9c69d-5244-44bb-8ecb-87fa26c3f743",
    "Name": "Joseph Russell",
    "Email": "shane27@example.org",
    "Account_Age_Days": 559,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 23.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "3d4ea4c5-4ee2-4a9e-ab53-7dab63f8cc87",
    "Name": "Charles Smith",
    "Email": "fergusonbrandi@example.net",
    "Account_Age_Days": 537,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 11.0,
    "Last_Support_Ticket": "I'm very frustrated with the downtime. This is unacceptable.",
    "Churn": 1
  },
  {
    "Customer_ID": "1fae1d6a-a647-4168-8123-a247444553ca",
    "Name": "Michael Dalton",
    "Email": "andrewwilliams@example.org",
    "Account_Age_Days": 753,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 46.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "695477b1-bbc1-427c-adc2-0409e679ffaf",
    "Name": "Patricia Preston",
    "Email": "nwilliams@example.com",
    "Account_Age_Days": 35,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 109.0,
    "Last_Support_Ticket": "Just upgraded to the Pro plan, excited to use it.",
    "Churn": 1
  },
  {
    "Customer_ID": "2bcf2c79-fb74-4813-818e-693b3a8594cb",
    "Name": "Stephanie Bryant",
    "Email": "vcrosby@example.org",
    "Account_Age_Days": 715,
    "Login_Frequency": "Weekly",
    "Daily_Usage_Mins": 1.0,
    "Last_Support_Ticket": "I've been waiting for support for 3 days. I'm cancelling.",
    "Churn": 1
  },
  {
    "Customer_ID": "7ba156a9-0478-4c8c-8a72-25d96f329d16",
    "Name": "Emily Ford",
    "Email": "mcguirejoel@example.net",
    "Account_Age_Days": 323,
    "Login_Frequency": "Rarely",
    "Daily_Usage_Mins": 14.0,
    "Last_Support_Ticket": "Why did my subscription price increase without notice?",
    "Churn": 1
  },
  {
    "Customer_ID": "25bea0d8-834c-4b6c-8fb8-f6b66d2e441a",
    "Name": "Jerry Stewart",
    "Email": "bradleykrause@example.org",
    "Account_Age_Days": 80,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 49.0,
    "Last_Support_Ticket": "Can I add more seats to my current plan?",
    "Churn": 0
  },
  {
    "Customer_ID": "124e345e-9406-4347-8e3e-27f352a4af95",
    "Name": "Jodi Nelson",
    "Email": "qvillarreal@example.net",
    "Account_Age_Days": 958,
    "Login_Frequency": "Daily",
    "Daily_Usage_Mins": 39.0,
    "Last_Support_Ticket": "When will the maintenance window end?",
    "Churn": 0
  }
];

/**
 * Robust CSV parser handling quoted cells, commas within quotes, escaped quotes, and CRLF/LF.
 */
export function parseCSV(csvText) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let currentToken = '';

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentToken += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentToken.trim());
      currentToken = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \n
      }
      row.push(currentToken.trim());
      if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
        lines.push(row);
      }
      row = [];
      currentToken = '';
    } else {
      currentToken += char;
    }
  }

  if (currentToken !== '' || row.length > 0) {
    row.push(currentToken.trim());
    if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
      lines.push(row);
    }
  }

  if (lines.length < 2) {
    throw new Error('CSV must contain a header line and at least one data row.');
  }

  const headers = lines[0].map(h => h.replace(/^"|"$/g, '').trim());
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i];
    const record = {};
    headers.forEach((header, colIdx) => {
      let val = values[colIdx] !== undefined ? values[colIdx].replace(/^"|"$/g, '') : '';
      // Parse numeric fields if applicable
      if (header === 'Daily_Usage_Mins' || header === 'daily_usage_mins') {
        val = parseFloat(val) || 0;
      } else if (header === 'Account_Age_Days' || header === 'account_age_days' || header === 'Churn' || header === 'churn') {
        val = val !== '' ? parseInt(val, 10) : null;
      }
      record[header] = val;
    });
    records.push(record);
  }

  return records;
}

/**
 * Exports scored and enriched records to a downloadable CSV string.
 */
export function exportToCSV(records) {
  if (!records || !records.length) return '';

  const columns = [
    'Customer_ID',
    'Name',
    'Email',
    'severity_tier',
    'engagement_level',
    'sentiment_level',
    'Login_Frequency',
    'Daily_Usage_Mins',
    'Last_Support_Ticket',
    'retention_action',
    'csm_explanation',
    'triaged_status'
  ];

  const escapeCell = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const headerRow = columns.join(',');
  const rows = records.map(r => {
    return columns.map(col => {
      if (col === 'triaged_status') {
        return escapeCell(r.isTriaged ? 'Triaged' : 'Pending');
      }
      return escapeCell(r[col] !== undefined ? r[col] : (r.raw_signal_values && r.raw_signal_values[col]));
    }).join(',');
  });

  return [headerRow, ...rows].join('\n');
}

/**
 * Downloads a string content as a file in the browser.
 */
export function downloadFile(filename, content, mimeType = 'text/csv;charset=utf-8;') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
