interface LegalListItem {
  text: string;
  sublist?: string[];
}

type LegalBlock =
  | { type: "p"; text: string }
  | { type: "label"; text: string }
  | { type: "ul"; items: LegalListItem[] };

interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  title: string;
  effectiveDate?: string;
  sections: LegalSection[];
}

export const PRIVACY_POLICY: LegalDocument = {
  title: "Website Privacy Policy",
  effectiveDate: "January 1, 2021",
  sections: [
    {
      heading: "Overview",
      blocks: [
        {
          type: "p",
          text: "Your privacy is very important to Health Chain Inc. (“Health Chain,” “we,” and/or “us”). We are dedicated to the responsible collection, use, maintenance and disclosure of personal information and are committed to comply with applicable privacy rules and regulations. This Privacy Policy explains how we collect, use, and share information collected from including its current and future affiliated entities, including our sister company iNetFrame Technologies, domain and subdomains as well as any software, platform, or application owned or licensed by Health Chain (collectively, the Services).",
        },
        {
          type: "p",
          text: "This policy does not apply to information collected through other means such as by telephone or in person, although that information may be protected by other privacy policies. In addition to the activities described in this Privacy Policy, we process information provided by our customers when they use our Services. Our customers use our Services to run their businesses and provide Services to their end users, which involves collecting information about their end users. To understand how a customer uses information about you, please refer to the customer’s privacy policy. Any information you provide, including any personal information, will be transferred to and processed by a computer server located within the United States.",
        },
        {
          type: "p",
          text: "This Privacy Policy is incorporated into and subject to the Terms of Use and any terms of any subscription or user agreement entered by you (by accepting a click-wrap agreement or otherwise) for availing the Services (“User Agreement”).",
        },
      ],
    },
    {
      heading: "Cookies and Tracking",
      blocks: [
        {
          type: "p",
          text: "The Company may use various technologies, including cookies, tokens, tags, web logs, web beacons, scripts, and web server logs to gather automatically collected information and may aggregate this information from our website visitors or to enable certain features of our website. This information may include demographic data, technical information about the technology (e.g., phone, computer) used to connect to our website, web browser information, your IP address, and browsing behavior such as pages visited and how often they are visited (“Activity Information”). We may also use third-party analytics companies to provide these services.",
        },
        {
          type: "p",
          text: "We may also allow third-party service providers to use cookies and other technologies to collect information and to track browsing activity over time and across third-party websites such as web browsers used to read our websites, which websites are referring traffic or linking to our websites, and to deliver targeted advertisements to you. We do not control these third-party technologies and their use is governed by the privacy policies of third parties using such technologies.",
        },
        {
          type: "p",
          text: "For more information about third-party advertising networks and similar entities that use these technologies, see www.aboutads.info/consumers, and to opt out of such ad networks’ and services’ advertising practices, go to www.aboutads.info/choices and www.networkadvertising.org/choices. Once you click the link, you may choose to opt out of such advertising from all participating advertising companies or only advertising provided by specific advertising companies. Please note that to the extent advertising technology is integrated into our website, you may still receive advertisements even if you opt out of tailored advertising. In that case, the ads will just not be tailored. Also, we do not control any of the above opt-out links and are not responsible for any choices you make using these mechanisms or the continued availability or accuracy of these mechanisms. Activity Information is captured using various technologies and may include cookies. “Cookies” are small text files that may be placed on your computer when you visit an Online Service or click on a URL. Cookies may include “single-session cookies” which generally record information during only a single visit to a website and then are erased, and “persistent” cookies which are generally stored on a computer unless or until they are deleted or are set to expire. You may disable cookies and similar items by adjusting your browser preferences at any time; however, this may limit your ability to take advantage of all the features on our website.",
        },
        {
          type: "p",
          text: "In addition, you may also have additional means to manage the collection of Activity Information by:",
        },
        {
          type: "ul",
          items: [
            { text: "Managing the use of “flash” technologies with the Flash management tools available at Adobe’s website;" },
            { text: "Clicking on the available “Opt-Out” link at the bottom of the applicable home web page;" },
            { text: "Visiting Google to “Opt-Out” of display advertising or customize Google display network ads; and/or" },
            { text: "Clicking on the SessionCam “Opt-Out” link." },
          ],
        },
        {
          type: "p",
          text: "Please note that we do not currently respond to web browser “Do Not Track” signals that provide a method to opt out of the collection of information about online activities over time and across third-party websites or our website because, among other reasons, there is no common definition of such signals and no industry-accepted standards for how such signals should be interpreted.",
        },
        {
          type: "p",
          text: "We gather Activity Information about you in order to improve the quality of our services, such as the best method and time to contact you. Without limiting the other ways in which we may use Information as described herein, we may otherwise use and disclose your Activity Information unless restricted by this Policy or by law. Some examples of the ways we use your Activity Information include:",
        },
        {
          type: "ul",
          items: [
            { text: "Customizing your experiences, including managing and recording your preferences;" },
            { text: "Authenticating your account information;" },
            { text: "Marketing, product development, and research purposes;" },
            { text: "Tracking resources and data accessed on our website;" },
            { text: "Developing reports regarding website usage, activity, and statistics;" },
            { text: "Assisting users experiencing problems with our services;" },
            { text: "Updating and servicing our website;" },
            { text: "Enabling certain functions and tools on the website; and" },
            { text: "Tracking paths of visitors to our website and within our website." },
          ],
        },
        {
          type: "p",
          text: "As described above, we may use tracking technologies that allow us to recognize your device when you return to our website within a period of time, as determined by us, and to support automatic login to your website. To maintain your privacy, you should affirmatively log out of your account prior to your session ending (whether you end your session or we end your session, for example if our website has “timed out” – i.e. we have ended your session automatically after a period of inactivity as determined by us in our sole discretion). Unless you affirmatively log out of your account, you may be automatically logged back in the next time you, or any user of your devices visits our website.",
        },
      ],
    },
    {
      heading: "Your Personal Information",
      blocks: [
        {
          type: "p",
          text: "This website may include web pages that give you the opportunity to provide us with personal information about yourself. You do not have to provide us with personal information if you do not want to; however, that may limit your ability to use certain functions of this website or to request certain services or information. We may use personal information for a number of purposes such as:",
        },
        {
          type: "ul",
          items: [
            { text: "To respond to an email or particular request from you." },
            { text: "To personalize the website for you." },
            { text: "To process an application as requested by you." },
            { text: "To administer surveys and promotions." },
            { text: "To provide you with information that we believe may be useful to you, such as information about health products or services provided by us or other businesses." },
            { text: "To perform analytics and to improve our products, websites, and advertising." },
            { text: "To comply with applicable laws, regulations, and legal process." },
            { text: "To protect someone’s health, safety, or welfare." },
            { text: "To protect our rights, the rights of affiliates or related third parties, or take appropriate legal action, such as to enforce our Terms of Use." },
            { text: "To keep a record of our transactions and communications." },
            { text: "As otherwise necessary or useful for us to conduct our business, so long as such use is permitted by law." },
          ],
        },
        {
          type: "p",
          text: "We may use personal information to contact you through any contact information you provide through this website, including any email address, telephone number, cell phone number, text message number, or fax number. Please see the section below titled “Our Online Communications Practices.”",
        },
        {
          type: "p",
          text: "We may also share personal information within the Company, and we may combine personal information that you provide us through this website with other information we have received from you, whether online or offline, or from other sources such as from our vendors. For example, if you have purchased a product or service from us, we may combine personal information you provide through this website with information regarding your receipt of the product or service.",
        },
        {
          type: "label",
          text: "Changes to this Website Privacy Policy",
        },
        {
          type: "p",
          text: "We may change this policy. If we do so, such change will appear on this page of our website. We will also provide appropriate notice and choices to you, on this website and in other appropriate locations, based on the scope and extent of changes. You may always visit this policy to learn of any updates.",
        },
        {
          type: "label",
          text: "Social Media Disclaimer",
        },
        {
          type: "p",
          text: "Are you using social media? So are we! We encourage you to read, share, follow us and provide commentary on Facebook®, Twitter®, Pinterest®, Instagram® and other social media sites. Before you post, please make sure you read our social media disclaimer:",
        },
        {
          type: "p",
          text: "We are under no obligation to screen or monitor your posts or any other User Content, however, we do make a reasonable effort to monitor participation to ensure that you stay on topic, are courteous and avoid making offensive comments. Your posts and User Content must adhere to the following requirements and cannot:",
        },
      ],
    },
    {
      heading: "Sharing Personal Information",
      blocks: [
        {
          type: "p",
          text: "We will only share your personal information with third parties as outlined in this policy and as otherwise permitted by law.",
        },
        {
          type: "p",
          text: "We may share personal information if all or part of the Company is sold, merged, dissolved, acquired, or in a similar transaction.",
        },
        {
          type: "p",
          text: "We may share personal information in response to a court order, subpoena, search warrant, law or regulation. We may cooperate with law enforcement authorities in investigating and prosecuting activities that are illegal, violate our rules, or may be harmful to other visitors.",
        },
        {
          type: "p",
          text: "If you submit information or a posting to a chat room, bulletin board, or similar “chat” related portion of this website, the information you submit along with your screen name will be visible to all visitors, and such visitors may share with others. Therefore, please be thoughtful in what you write and understand that this information may become public.",
        },
        {
          type: "p",
          text: "We may also share personal information with other third-party companies that we collaborate with or hire to perform services on our behalf. For example, we may hire a company to help us send and manage email, and we might provide the company with your email address and certain other information in order for them to send you an email message on our behalf. Similarly, we may hire companies to host or operate some of our websites and related computers and software applications. This website may permit you to view your visitor profile and related personal information and to request changes to such information. If this function is available, we will include a link on this website with a heading such as “My Profile” or similar words. Clicking on the link will take you to a page through which you may review your visitor profile and related personal information. We do not sell your personal information to anyone at any point of time.",
        },
      ],
    },
    {
      heading: "Your California Privacy Rights",
      blocks: [
        {
          type: "p",
          text: "If you are a California resident, you may exercise the following rights:",
        },
        {
          type: "ul",
          items: [
            { text: "Right to Know and Access. Subject to our ability to reasonably verify your identity in light of the information requested and pursuant to relevant CCPA requirements, limitations, and regulations, you may submit a verifiable request for information regarding the: (1) categories of Personal Information collected, sold, or disclosed by us; (2) purposes for which categories of Personal Information are collected or sold by us; (3) categories of sources from which we collect Personal Information; and (4) specific pieces of Personal Information we have collected about you during the past 12 months." },
            { text: "Right to Delete. Subject to our ability to reasonably verify your identity in light of the information requested and pursuant to relevant CCPA requirements, limitations, and regulations, as well as subject to certain exceptions, you may submit a verifiable request that we delete Personal Information about you that we have collected." },
            { text: "Right to Equal Service and Price. You have the right not to receive discriminatory treatment for the exercise of your CCPA privacy rights, subject to certain limitations." },
            { text: "Shine the Light. You may request information once per calendar year about our disclosures of certain categories of Personal Information to third parties for their direct marketing purposes. Such requests must be submitted to us in writing using the How to Contact Us section below. To exercise your rights under the CCPA, please contact us via our Contact Us section." },
          ],
        },
        {
          type: "p",
          text: "To authorize an agent to make a request to know, delete, or opt out on your behalf, please send a written authorization signed by you and the authorized agent to us via the Contact Us section below.",
        },
      ],
    },
    {
      heading: "Website and Information Security",
      blocks: [
        {
          type: "p",
          text: "We maintain reasonable administrative, technical and physical safeguards designed to protect the information that you provide on this website. However, no security system is impenetrable, and we cannot guarantee the security of our website, nor can we guarantee that the information you supply will not be intercepted while being transmitted to us over the Internet, and we are not liable for the illegal acts of third parties such as criminal hackers.",
        },
      ],
    },
    {
      heading: "Our Online Communication Practices",
      blocks: [
        {
          type: "p",
          text: "We may send electronic newsletters, notification of account status, and other communications, such as marketing communications, on a periodic basis to various individuals and organizations. We may also send email communications regarding topics such as general health benefits, website updates, health conditions, and general health topics. We offer you appropriate consent mechanisms, such as opt-out, for marketing and certain other communications. As examples, you may opt out as provided for in a specific email communication or contact us as described below in the section “Contact Us.” Please be aware that opt-outs may not apply to certain types of communications, such as account status, website updates, or other communications.",
        },
      ],
    },
    {
      heading: "Children’s Privacy",
      blocks: [
        {
          type: "p",
          text: "We will not intentionally collect any personal information from children under the age of 13 through this website without receiving parental consent. If you think that we have collected personal information from a child under the age of 13 through this website, please contact us.",
        },
      ],
    },
    {
      heading: "Social Media Disclaimer",
      blocks: [
        {
          type: "p",
          text: "Are you using social media? So are we! We encourage you to read, share, follow us and provide commentary on Facebook®, Twitter®, Pinterest®, Instagram® and other social media sites. Before you post, please make sure you read our social media disclaimer:",
        },
        {
          type: "p",
          text: "We are under no obligation to screen or monitor your posts or any other User Content, however, we do make a reasonable effort to monitor participation to ensure that you stay on topic, are courteous and avoid making offensive comments. Your posts and User Content must adhere to the following requirements and cannot:",
        },
        {
          type: "ul",
          items: [
            { text: "Contain any third-party material including logos, drawings, tattoos, photographs, pictures, sculptures, paintings and other images or works of art, phrases, trademarks, trade secrets or other items without explicit prior written permission to use such materials." },
            { text: "Contain sexually explicit, graphic, gratuitous or unnecessarily violent content or defamatory or derogatory content against any ethnic, racial, gender, religious, sexual orientation, professional or age group or contain any pornographic or nude material." },
            { text: "Contain any private information about yourself or any other individual, including without limitation, information related to the health of the individual, financial information about the individual or any identification or account numbers related to the individual, with or without their permission or consent." },
            { text: "Contain any software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software, hardware or telecommunications equipment." },
            { text: "Contain any advertising, promotional materials, “junk mail”, “spam”, “chain letters”, “pyramid schemes”, or promote illegal activity and/or illegal contests, sweepstakes, gambling, including any online casino, sports books, bingo, poker or any other form of solicitation." },
          ],
        },
        {
          type: "p",
          text: "We reserve the right to edit comments for content, remove off-topic contributions, delete offensive comments or remarks, block offensive contributors and delete actual or suspected spam content from any Social Media site. Please be aware that once you post something online, there is the potential for numerous individuals to read your words, even years from now. Therefore, we suggest that you exercise caution when posting on any social media sites and that you not disclose personally identifiable information like your location, medical record number, personal medical information, financial information, etc. We are not responsible for the content of any comments or responses posted by others to any website or social media site managed or monitored by Health Chain. We do not control the placement of any marketing or advertising displayed on our pages by social media or third-party organizations. The inclusion of links to other websites does not imply any endorsement of the material on the websites.",
        },
        {
          type: "p",
          text: "Please remember that information posted on any of our social media platforms is for general informational purposes only and should not be considered medical advice and should not replace a consultation with your health care professional. Always consult an appropriate health care professional for your specific needs. If you are experiencing a medical emergency, call 9-1-1 or your local emergency number. Some treatments mentioned on social media formats may not be covered by your health plan. Please refer to your benefit plan documents for information about coverage.",
        },
        {
          type: "p",
          text: "We reserve the right to respond to any post or User Content and may occasionally privately request your contact information to assist offline with your consent by routing the matter to the appropriate persons or department for further handling. All trademarks are the property of their respective owners.",
        },
      ],
    },
    {
      heading: "Your Consent",
      blocks: [
        {
          type: "p",
          text: "By using our Services and/or by providing your information, you consent to the collection and use of the information you disclose on the Services by Health Chain in accordance with this Privacy Policy. If you do not agree, please do not use or access our Services.",
        },
      ],
    },
    {
      heading: "Changes to this Privacy Policy",
      blocks: [
        {
          type: "p",
          text: "We may change this Privacy Policy and will post any changes on this page. The revised version will be effective when it is posted. We will also provide appropriate notice and choices to you, through the Services, by email, or other communication, if we materially change the ways in which we use or share personal information previously collected from you through the Services. You may also visit this Privacy Policy to learn of any updates.",
        },
      ],
    },
    {
      heading: "Contact Us",
      blocks: [
        {
          type: "p",
          text: "To contact us regarding this policy and our related privacy practices, email info@healthchain.com or write to us at our offices at Health Chain, 5830 Granite Pkwy, STE #100-284, Plano, TX 75024.",
        },
        {
          type: "p",
          text: "If you believe we or any company associated with us has misused any of your information, please contact us immediately and report such misuse.",
        },
      ],
    },
  ],
};

export const TERMS_OF_USE: LegalDocument = {
  title: "Health Chain Terms of Use",
  sections: [
    {
      heading: "Overview",
      blocks: [
        {
          type: "p",
          text: "These Health Chain Website Terms of Use (“Terms”) govern the use of web pages, software and content located within www.healthchain.com including its domain and subdomains and apply generally to any of Health Chain’s or its affiliates’, subsidiaries’ or joint ventures’ websites (collectively, the Site).",
        },
        {
          type: "p",
          text: "Additionally, Health Chain’s Privacy Policy explains how Health Chain handles information collected from the visitors and users of the Site.",
        },
        {
          type: "p",
          text: "By accessing, browsing or using the Site, you acknowledge that you have read, understood and agree to be bound by these Terms and to comply with all applicable laws and regulations, including United States export and re-export control laws and regulations. You also confirm that you are not a minor and you possess the legal right and capacity to understand and agree to the Terms. If you do not agree to these Terms, please do not use or access the Site. Unauthorized use of the Site may give rise to a claim for damages and/or be a criminal offence.",
        },
        {
          type: "p",
          text: "Health Chain may amend the Terms at any time by posting the amended terms on the Site. Health Chain also reserves the right to change or remove features and contents of the Site.",
        },
        {
          type: "p",
          text: "If any term, provision, covenant or condition of these Terms is held invalid or unenforceable for any reason, the remainder of the provisions will continue in full force and effect as if these Terms had been executed with the invalid portion eliminated.",
        },
      ],
    },
    {
      heading: "License to Use the Site",
      blocks: [
        {
          type: "p",
          text: "Health Chain grants you a limited license to access and make personal use of the Site, subject to the Terms. Without the express written consent of Health Chain, you may not reproduce, duplicate, copy, download, sell or otherwise exploit for any commercial purpose the Site and any portion hereof. This limited license terminates automatically, without notice to you, if you breach these Terms.",
        },
      ],
    },
    {
      heading: "Your Conduct and Obligations",
      blocks: [
        {
          type: "ul",
          items: [
            { text: "You undertake to assure that the Site shall be used for lawful purposes only and that you shall not violate any applicable law." },
            {
              text: "Without prejudice to the generality of the above, you confirm that you shall not:",
              sublist: [
                "post, distribute, or otherwise make available or transmit any software or other computer files that contain any virus trojan horses, time bombs, bots, botnets, malicious content, content theft, data manipulation, threats or any other harmful programs or elements or components;",
                "use any meta tags or any other hidden text utilizing Health Chain’s name, trademarks, service marks and logos (collectively, “Marks”);",
                "frame or utilize framing techniques to enclose any Marks or other information (including images, text, page layout and form) from the Site;",
                "delete from the Site any legal notices, disclaimers, or proprietary notices such as copyright or trademark symbols, or modify any logos that you do not own or have express permission to modify;",
                "use the Site in any manner that could damage, disable, overburden, impair, harm or potentially harm Health Chain’s server, or any network, computer system / resource connected to a Health Chain server, or interfere with any other person’s use and enjoyment of the Site;",
                "carry out any denial of service (DoS, DDoS) or any other harmful attacks on application or internet service;",
                "disrupt, place unreasonable burdens or excessive loads on, interfere with or attempt to make or attempt any unauthorized access to the Site; or",
                "forge headers or otherwise manipulate identifiers in order to disguise the origin of any content transmitted through the Site.",
              ],
            },
          ],
        },
      ],
    },
    {
      heading: "Electronic Communications",
      blocks: [
        {
          type: "p",
          text: "When you visit the Site or send e-mails to Health Chain, you are communicating with Health Chain electronically. You consent to receive communications from Health Chain electronically. Health Chain will communicate with you by e-mail or by posting notices on the Site. You agree that all agreements, notices, disclosures and other communications that Health Chain provides to you electronically satisfy any legal requirement that such communications be in writing.",
        },
      ],
    },
    {
      heading: "Trademarks",
      blocks: [
        {
          type: "p",
          text: "Health Chain and its affiliated companies reserve all rights to their Marks. The Marks are highly valued intellectual property, and therefore Health Chain will take the necessary steps to guard against dilution and the use of third-party marks which are confusingly similar to Marks or which are likely to cause confusion with Marks.",
        },
      ],
    },
    {
      heading: "Copyright",
      blocks: [
        {
          type: "p",
          text: "All content (including the design, layout, look, appearance and graphics) provided on the Site are owned by or licensed to Health Chain and its affiliated companies and protected by United States and international copyright laws. Health Chain and its licensors retain all proprietary rights to the content on the Site. Such content may not be reproduced, transmitted or distributed without the prior written consent of Health Chain.",
        },
      ],
    },
    {
      heading: "Links to Third Party Sites",
      blocks: [
        {
          type: "p",
          text: "The Site may also include links to third party websites. These links are provided for your convenience to provide further information. They do not signify that Health Chain endorses the third-party website(s). Health Chain has no responsibility for the content of the linked website(s).",
        },
      ],
    },
    {
      heading: "Indemnification",
      blocks: [
        {
          type: "p",
          text: "You agree to indemnify, defend and hold harmless Health Chain, its affiliated companies and the respective officers, directors, employees or agents of any such entities from and against any and all claims, liabilities, damages, losses, costs, expenses and fees (including reasonable attorneys’ fees) that such parties may incur as a result of or arising from your (or anyone using your account, computer or software’s) use of the Site or violation of these Terms. Health Chain reserves the right to assume the exclusive defense and control of any matter otherwise subject to indemnification by you and, in such case, you agree to cooperate with Health Chain’s defense of such claim. In no event may you agree to any settlement affecting Health Chain without Health Chain’s written consent.",
        },
      ],
    },
    {
      heading: "Disclaimers",
      blocks: [
        {
          type: "p",
          text: "All information, content, products and services provided on the Site are provided “as is” and “with all faults” with no warranties of any kind. Health Chain expressly disclaims to the fullest extent permitted by law all express, implied, statutory or other warranties and representations, including, without limitation, the warranties of merchantability, fitness for a particular use or purpose, title and noninfringement of proprietary and intellectual property rights, and warranties arising from a course of dealing, usage or trade practice. Without limiting the generality of the foregoing, Health Chain makes no warranty that the Site will meet your requirements or that the Site will be uninterrupted, timely, secure or error free.",
        },
        {
          type: "p",
          text: "To the fullest extent permitted by law, in no event will Health Chain be liable for any direct, indirect, special, consequential, incidental, punitive or exemplary damages, including, without limitation, those resulting from lost profits, revenues or savings, loss or damage to data or business interruption arising out of the use of or inability to use the Site or any materials, information, products or services accessed on or through this Site, whether such damages are based on warranty, contract, tort, statute or any other legal theory and even if Health Chain has been advised (or should have known) of the possibility of such damages.",
        },
      ],
    },
    {
      heading: "Governing Law & Remedies",
      blocks: [
        {
          type: "p",
          text: "Your use of the Site and any dispute arising out of such use shall be subject to the laws of the State of California. You hereby consent to the exclusive jurisdiction and venue in the courts of Collin and Denton Counties, State of Texas over any legal action arising out of the use of the Site.",
        },
        {
          type: "p",
          text: "You agree that breach of these Terms would cause immediate and irreparable harm to Health Chain for which money damages would be inadequate. Therefore, Health Chain will be entitled to injunctive relief for your breach of these Terms without proof of actual damages and without the posting of bond or other security. Such remedy shall not be deemed to be the exclusive remedy for such breach but shall be in addition to all other remedies available at law or in equity.",
        },
      ],
    },
    {
      heading: "Contact Us",
      blocks: [
        {
          type: "p",
          text: "Health Chain welcomes your questions and comments regarding these Terms. You may contact Health Chain at info@healthchain.com or write to us at Health Chain, 5830 Granite Pkwy, STE #100-284, Plano, TX 75024.",
        },
      ],
    },
  ],
};
