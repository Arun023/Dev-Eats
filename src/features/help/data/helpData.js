export const helpCategories = [
  {
    id: "help-with-orders",
    title: "Help with orders",
    description: "Queries related to your past, active, or cancelled orders",
    faqs: [
      {
        id: "order-1",
        question: "My order was delayed. How can I get help?",
        answer: "We sincerely apologize for the delay! Delivery times can vary depending on weather, kitchen preparation times, and traffic conditions. You can track your order live or reach out to our live chat support for real-time updates.",
        action: "CHAT WITH US",
      },
      {
        id: "order-2",
        question: "I received an incorrect or missing item in my order.",
        answer: "We are deeply sorry for the oversight. Please report the missing or incorrect item along with a photo if possible, and our team will immediately process a refund or arrange a replacement.",
        action: "REPORT ITEM ISSUE",
      },
      {
        id: "order-3",
        question: "Can I edit or change my delivery address after placing an order?",
        answer: "Address changes can be requested within 60 seconds of placing an order. After the restaurant confirms the order, address changes depend on the delivery partner's location.",
        action: "CONTACT SUPPORT",
      },
      {
        id: "order-4",
        question: "How do I cancel my order?",
        answer: "You can cancel your order directly from the order status page before the kitchen starts preparing your food. If preparation has begun, cancellation fees may apply.",
        action: "VIEW ORDER STATUS",
      },
    ],
  },
  {
    id: "deveats-pro-faqs",
    title: "Dev-Eats Pro FAQs",
    description: "All about Dev-Eats Pro membership & exclusive benefits",
    faqs: [
      {
        id: "pro-1",
        question: "What is Dev-Eats Pro membership?",
        answer: "Dev-Eats Pro is our premium subscription program offering Unlimited Free Delivery on orders above ₹149, extra discounts up to 30% off at top restaurants, and zero surge fees.",
      },
      {
        id: "pro-2",
        question: "How do I upgrade to Dev-Eats Pro?",
        answer: "You can subscribe to Dev-Eats Pro directly from the Profile or Checkout section. Choose between monthly (₹99/mo) or annual (₹499/yr) plans.",
      },
      {
        id: "pro-3",
        question: "Can I share my Dev-Eats Pro subscription with family?",
        answer: "Dev-Eats Pro benefits are tied to your primary account phone number. However, you can place orders to any delivery address using your account.",
      },
    ],
  },
  {
    id: "general-issues",
    title: "General issues",
    description: "Account, app, payment, and general support topics",
    faqs: [
      {
        id: "gen-1",
        question: "What is Dev-Eats Customer Care Number?",
        answer: "We do not have an inbound phone helpline number. For quick assistance, please use our 24/7 in-app Live Chat support or write to us at support@deveats.com. Our support team responds within minutes!",
        action: "SEND AN EMAIL",
      },
      {
        id: "gen-2",
        question: "I am unable to find the restaurant I'm looking for",
        answer: "If a restaurant isn't visible, it might be currently offline, out of your delivery radius, or undergoing kitchen maintenance. Check back shortly or try searching for specific dish names.",
      },
      {
        id: "gen-3",
        question: "I see surge fees on app",
        answer: "Surge fees are temporarily applied during peak meal hours, heavy rainfall, or extreme demand to compensate our delivery partners fairly. Dev-Eats Pro members enjoy surge-free orders!",
      },
      {
        id: "gen-4",
        question: "I am unable to place a cash on delivery order",
        answer: "Cash on delivery (COD) may be temporarily disabled due to high order volume, delivery partner availability, or high cart value limit exceeding ₹2000. Online payments via UPI, Cards, and Netbanking remain active.",
      },
      {
        id: "gen-5",
        question: "I did not receive my OTP on SMS",
        answer: "Please ensure your phone has network coverage. If OTP is delayed, wait 30 seconds and click 'Resend OTP via WhatsApp' or try voice call verification.",
      },
      {
        id: "gen-6",
        question: "I have a coupon related query for non food issues",
        answer: "Coupons must be applied at checkout before placing an order. If a valid coupon fails to apply, verify its minimum order value and validity date.",
      },
      {
        id: "gen-7",
        question: "My payment was deducted but the order was not processed",
        answer: "If your money was debited but no order was generated, don't worry! Banks automatically reverse failed transactions within 2-4 banking hours. If not received, please share payment transaction ID with support.",
        action: "CHAT WITH US",
      },
      {
        id: "gen-8",
        question: "I want to unsubscribe from Dev-Eats communications",
        answer: "You can manage promotional SMS, email newsletters, and push notifications under Account Settings > Notification Preferences.",
      },
      {
        id: "gen-9",
        question: "Why was I charged a cancellation fee?",
        answer: "Cancellation fees apply if an order is cancelled after the restaurant has already initiated food preparation or assigned a delivery partner.",
      },
    ],
  },
  {
    id: "partner-onboarding",
    title: "Partner Onboarding",
    description: "Grow your restaurant business by partnering with Dev-Eats",
    faqs: [
      {
        id: "partner-1",
        question: "I want to partner my restaurant with Dev-Eats",
        answer: "Welcome aboard! Registering your restaurant on Dev-Eats takes less than 15 minutes. Click on 'Partner With Us' in the footer or visit partner.deveats.com to begin registration.",
        action: "START ONBOARDING",
      },
      {
        id: "partner-2",
        question: "What are the mandatory documents needed to list my restaurant on Dev-Eats?",
        answer: "You will need: 1. FSSAI License copy, 2. PAN Card of legal entity/proprietor, 3. GST Registration Certificate (if applicable), 4. Bank Account details & cancelled cheque, 5. Restaurant Menu & food images.",
      },
      {
        id: "partner-3",
        question: "I want to opt-out from Google reserve",
        answer: "You can request opt-out from third-party Reserve links by emailing merchant-support@deveats.com with your Merchant ID.",
      },
      {
        id: "partner-4",
        question: "After I submit all documents, how long will it take for my restaurant to go live on Dev-Eats?",
        answer: "Once all required documents and menu details are verified, your restaurant profile goes live within 24-48 business hours.",
      },
      {
        id: "partner-5",
        question: "What is this one time Onboarding fees? Do I have to pay for it while registering?",
        answer: "Onboarding fees cover menu digitizing, tablet setup, and welcome kit creation. This amount is deducted directly from your first week's restaurant payout.",
      },
      {
        id: "partner-6",
        question: "Who should I contact if I need help & support in getting onboarded?",
        answer: "Our partner onboarding specialists are available at 1800-DEVEATS-PARTNER (9 AM to 8 PM) or via email at partner-help@deveats.com.",
        action: "EMAIL PARTNER SUPPORT",
      },
      {
        id: "partner-7",
        question: "How much commission will I be charged by Dev-Eats?",
        answer: "Standard commission rates range between 15% - 22% depending on city tier, delivery radius, and menu pricing. Custom plans are available for high-volume partners.",
      },
      {
        id: "partner-8",
        question: "I don't have an FSSAI licence for my restaurant. Can it still be onboarded?",
        answer: "FSSAI license is strictly mandatory per Government regulations. You can apply for a basic FSSAI registration online at foscos.fssai.gov.in and upload the acknowledgment copy.",
      },
    ],
  },
  {
    id: "report-safety-emergency",
    title: "Report Safety Emergency",
    description: "Immediate assistance for safety incidents and food hygiene issues",
    faqs: [
      {
        id: "safety-1",
        question: "Emergency Helpline Number for Delivery Safety",
        answer: "For urgent on-road safety incidents or medical emergencies involving delivery, call our 24x7 Safety Response Team at 1800-888-SAFETY.",
        action: "CALL EMERGENCY HELPLINE",
      },
      {
        id: "safety-2",
        question: "How to report food contamination or severe quality issue?",
        answer: "Please stop consuming the food immediately. Take clear photographs of the food item and submit a ticket under 'Help with Orders > Food Quality Issue'. Our safety officer will contact you within 15 minutes.",
        action: "REPORT SAFETY ISSUE",
      },
    ],
  },
  {
    id: "legal-terms-conditions",
    title: "Legal, Terms & Conditions",
    description: "Privacy policy, user agreements, and legal guidelines",
    faqs: [
      {
        id: "legal-1",
        question: "What is Dev-Eats Privacy Policy?",
        answer: "We prioritize user privacy. Your data is encrypted and used solely to fulfill food delivery services and improve user experience. We never sell user data to third parties.",
      },
      {
        id: "legal-2",
        question: "Terms of Use for Coupons and Promotional Schemes",
        answer: "Coupons are non-transferable, cannot be redeemed for cash, and apply only to qualifying food orders subject to minimum cart value limits.",
      },
    ],
  },
  {
    id: "deveats-money-faqs",
    title: "Dev-Eats Money FAQs",
    description: "Wallet balance, refunds, vouchers, and transactions",
    faqs: [
      {
        id: "money-1",
        question: "What are the latest changes on Dev-Eats Money?",
        answer: "Dev-Eats Money allows instant refunds directly into your in-app wallet balance, which can be seamlessly used for instant one-click checkouts without payment gateway delays.",
      },
      {
        id: "money-2",
        question: "How do the latest changes on Dev-Eats Money impact my balance?",
        answer: "Your existing balance remains 100% safe, fully accessible, and never expires. You can view detailed credit/debit logs in your Wallet section.",
      },
      {
        id: "money-3",
        question: "How do I add Dev-Eats Money balance in my account?",
        answer: "Go to Profile > Wallet > Add Money. Enter the desired amount (₹100 to ₹10,000) and pay via UPI, Netbanking, or Cards.",
      },
      {
        id: "money-4",
        question: "Where can I use Dev-Eats Money balance?",
        answer: "Dev-Eats Money balance can be applied toward any food delivery, cloud kitchen, or pickup order across the platform.",
      },
      {
        id: "money-5",
        question: "How do I add Dev-Eats Gift Voucher balance to my account?",
        answer: "Navigate to Profile > Wallet > Redeem Voucher. Enter your 16-digit voucher code and PIN to instantly credit your account.",
      },
      {
        id: "money-6",
        question: "What should I do if I am not able to use my Dev-Eats Money balance?",
        answer: "Ensure your wallet isn't locked due to multiple failed pin attempts. If problem persists, contact our financial support team via live chat.",
        action: "CHAT WITH SUPPORT",
      },
      {
        id: "money-7",
        question: "Is my money safe with Dev-Eats Money?",
        answer: "Yes, Dev-Eats Money operates in compliance with RBI wallet safety standards with 256-bit SSL encryption.",
      },
      {
        id: "money-8",
        question: "Can I transfer my Dev-Eats Money balance to my bank account?",
        answer: "Yes! Refund credits in your wallet can be transferred back to your original source bank account anytime with 0% processing fee.",
      },
    ],
  },
];
