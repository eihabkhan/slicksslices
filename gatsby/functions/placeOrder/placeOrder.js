const nodemailer = require('nodemailer');

const generateOrderEmail = ({ order, total }) => `
    <div>
      <h2>Your recent order for ${total}</h2>
      <p>We'll have your order ready in 20 minutes</p>
      <ul>
        ${order
          .map(
            (item) => `<li>
        <img src="${item.thumbnail}" alt="${item.name}"/>
        ${item.size} ${item.name} - ${item.price}
      </li>`
          )
          .join(' ')}
      </ul> 
      <p>Your total is <strong>$${total}</strong> due at pickup</p>
      <style>
          ul {
            list-style:none;

          }
      </style>
    </div>
  `;

// create transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// TEST SEND EMAIL
exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // check if honeypot is filled
  if (body.tajine) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Beep Boop Baap zzzzs! Goodbye 🤖' }),
    };
  }
  // Validate data coming is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Woops! you are missing the ${field} field`,
        }),
      };
    }
  }

  // check if order is not empty
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `You can't order nothing 😅`,
      }),
    };
  }

  // send email
  // send success / error message`
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, order@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
