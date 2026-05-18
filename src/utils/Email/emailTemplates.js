export function template({ type, message }) {
    switch (type) {
        case 'college-approved':
            return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>College Approved</title>
  <style>
    body { font-family: Arial, sans-serif; background:#f5f5f5; color:#333; margin:0; padding:0; }
    .container { max-width:600px; margin:30px auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);}
    .header { background:#16a34a; color:#fff; text-align:center; padding:25px; }
    .header h1 { margin:0; font-size:26px; }
    .content { padding:25px; text-align:center; }
    .content h2 { color:#16a34a; font-size:22px; margin-bottom:15px; }
    .content p { margin:12px 0; line-height:1.6; font-size:15px; }
    .button { display:inline-block; padding:12px 28px; margin-top:15px; background:#16a34a; color:#fff; text-decoration:none; border-radius:6px; font-size:16px; }
    .footer { background:#f5f5f5; padding:18px; text-align:center; font-size:12px; color:#666; }
    a { color:#16a34a; text-decoration:none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Institute Approved!</h1>
    </div>
    <div class="content">
      <h2>Congratulations ${message.name || 'Institute Admin'},</h2>
      <p>Your institute has been officially verified and approved by the Xcubit team.</p>
      <p>You can now log in to your <strong>Institute Dashboard</strong> to manage events, verify participants, and oversee your team’s activities.</p>
      <a href="${message.dashboard}" class="button">Go to Dashboard</a>
      <p style="margin-top:20px;">We’re excited to have you on board as part of the Xcubit community.<br/>
      If you have any questions, reach out to us anytime at <a href="mailto:${
          message.contactEmail
      }">${message.contactEmail}</a>.</p>
    </div>
    <div class="footer">
      <p>Sent to: ${message.email}</p>
      <p>©️ ${new Date().getFullYear()} Xcubit. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

        case 'joined-team':
            return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Xcubit - Joined Team Successfully</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: 'Poppins', Arial, sans-serif;
      background-color: #ffffff;
      color: #434343;
    "
  >
    <table
      role="presentation"
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="100%"
      style="background-color: #ffffff"
    >
      <tr>
        <td align="center">
          <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="680"
            style="
              background-color: #1a1a1a;
              background-image: url('https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80');
              background-size: cover;
              background-position: center top;
              border-radius: 8px;
              overflow: hidden;
            "
          >
            <!-- HEADER -->
            <tr>
              <td style="padding: 30px">
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                >
                  <tr>
                    <td valign="middle" style="color: #ffffff">
                      <img
                        src="https://www.xcubit.in/_next/static/media/logo.df47bba4.png"
                        height="35"
                        alt="Xcubit Logo"
                        style="vertical-align: middle"
                      />
                      <span
                        style="
                          font-size: 25px;
                          font-weight: 600;
                          color: #ffffff;
                          vertical-align: middle;
                          margin-left: 8px;
                        "
                        >xcubit</span
                      >
                    </td>
                    <td
                      align="right"
                      valign="middle"
                      style="color: #ffffff; font-size: 14px"
                    >
                      ${new Date().toLocaleDateString()}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- MAIN BODY -->
            <tr>
              <td align="center" style="padding: 40px 30px">
                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    background-color: #2b2b2b;
                    border-radius: 20px;
                    text-align: center;
                    color: #ffffff;
                    padding: 50px 25px;
                  "
                >
                  <tr>
                    <td>
                      <h1
                        style="
                          margin: 0;
                          font-size: 24px;
                          font-weight: 600;
                          color: #ffffff;
                        "
                      >
                        🎉 Welcome to the Team!
                      </h1>

                      <p
                        style="
                          margin: 20px 0 10px;
                          font-size: 16px;
                          font-weight: 500;
                        "
                      >
                        Hi ${message.name || 'Participant'},
                      </p>

                      <p
                        style="
                          margin: 10px 0 20px;
                          font-weight: 500;
                          line-height: 1.6;
                        "
                      >
                        You have successfully joined the team
                        <strong style="color: #c386ff"
                          >${message.teamName}</strong
                        >.<br /><br />
                        <strong>Event:</strong> ${message.eventName}<br />
                        <strong>Date:</strong> ${message.eventDate}<br />
                        <strong>Location:</strong> ${message.eventLocation}
                      </p>

                      <!-- BUTTONS -->
                      <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        align="center"
                        style="margin: 30px auto"
                      >
                        <tr>
                          <td align="center">
                            <a
                              href="${message.teamLink}"
                              style="
                                background-color: #c386ff;
                                color: #ffffff;
                                text-decoration: none;
                                font-weight: 600;
                                padding: 12px 25px;
                                border-radius: 8px;
                                display: inline-block;
                              "
                              >View Team</a
                            >
                            <a
                              href="${message.ticket}"
                              style="
                                background-color: #ba3d4f;
                                color: #ffffff;
                                text-decoration: none;
                                font-weight: 600;
                                padding: 12px 25px;
                                border-radius: 8px;
                                display: inline-block;
                                margin-left: 10px;
                              "
                              >View My Ticket</a
                            >
                          </td>
                        </tr>
                      </table>

                      <p
                        style="
                          margin-top: 30px;
                          font-size: 13px;
                          color: #cccccc;
                          line-height: 1.5;
                        "
                      >
                        If you have any questions, feel free to reach out to our
                        support team anytime.
                      </p>

                      <div
                        style="
                          margin-top: 40px;
                          text-align: left;
                          color: #d3d3d3;
                        "
                      >
                        <h3
                          style="
                            font-size: 16px;
                            font-weight: 600;
                            color: #ffffff;
                          "
                        >
                          What’s Next?
                        </h3>
                        <ul style="padding-left: 15px; line-height: 1.8">
                          <li>
                            <strong>Check your Team:</strong> View your team
                            details and members via your dashboard.
                          </li>
                          <li>
                            <strong>Prepare for the Event:</strong> Review event
                            schedules and requirements in your event section.
                          </li>
                          <li>
                            <strong>Stay Updated:</strong> Keep an eye on your
                            registered email for important updates and tasks.
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    max-width: 400px;
                    margin: 60px auto 0;
                    font-size: 12px;
                    color: #ffffff;
                    text-align: center;
                  "
                >
                  Need help? Contact us at
                  <a
                    href="mailto:helpdesk@xcubit.in"
                    style="color: #9d3bff; text-decoration: none"
                    >helpdesk@xcubit.in</a
                  >
                  or visit our
                  <a
                    href="https://www.xcubit.in/contact"
                    style="color: #9d3bff; text-decoration: none"
                    >Help Center</a
                  >.
                </p>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td
                align="center"
                style="
                  border-top: 1px solid #e6ebf1;
                  padding: 20px 0;
                  background-color: #2b2b2b;
                "
              >
                <img
                  src="https://www.xcubit.in/_next/static/media/logo.df47bba4.png"
                  height="20"
                  alt="Xcubit Logo"
                />
                <span
                  style="
                    font-weight: 700;
                    color: #c0c0c0;
                    font-size: 14px;
                    margin-left: 5px;
                  "
                  >xcubit</span
                >
                <p
                  style="
                    margin: 10px 0 0;
                    font-size: 10px;
                    color: #434343;
                  "
                >
                  61-C Rajouri Garden, New Delhi 110027
                </p>
                <div style="margin-top: 8px">
                  <a
                    href="https://www.instagram.com/xcubit_official/"
                    target="_blank"
                    style="display: inline-block; margin: 0 5px"
                  >
                    <img
                      src="https://paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_instagram.png"
                      width="20"
                      alt="Instagram"
                    />
                  </a>
                  <a
                    href="http://x.com/xcubit_official"
                    target="_blank"
                    style="display: inline-block; margin: 0 5px"
                  >
                    <img
                      src="https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_x.png"
                      width="20"
                      alt="Twitter"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/xcubit/"
                    target="_blank"
                    style="display: inline-block; margin: 0 5px"
                  >
                    <img
                      src="https://paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_linkedin.png"
                      width="20"
                      alt="LinkedIn"
                    />
                  </a>
                </div>
                <p
                  style="
                    margin-top: 5px;
                    color: #434343;
                    font-size: 10px;
                  "
                >
                  © ${new Date().getFullYear()} Xcubit. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

        case 'new-team':
            return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Xcubit | Team Created Successfully</title>
    </head>
    <body
        style="
            margin: 0;
            padding: 0;
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #ffffff;
            color: #434343;
        "
    >
        <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            style="background-color: #ffffff"
        >
            <tr>
                <td align="center">
                    <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        width="680"
                        style="
                            background-color: #1a1a1a;
                            background-image: url('https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80');
                            background-size: cover;
                            background-position: center top;
                            border-radius: 8px;
                            overflow: hidden;
                        "
                    >
                        <!-- HEADER -->
                        <tr>
                            <td style="padding: 30px">
                                <table
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                >
                                    <tr>
                                        <td valign="middle" style="color: #ffffff">
                                            <img
                                                src="https://www.xcubit.in/_next/static/media/logo.df47bba4.png"
                                                height="35"
                                                alt="Xcubit Logo"
                                                style="vertical-align: middle"
                                            />
                                            <span
                                                style="
                                                    font-size: 25px;
                                                    font-weight: 600;
                                                    color: #ffffff;
                                                    vertical-align: middle;
                                                    margin-left: 8px;
                                                "
                                                >xcubit</span
                                            >
                                        </td>
                                        <td
                                            align="right"
                                            valign="middle"
                                            style="
                                                color: #ffffff;
                                                font-size: 14px;
                                            "
                                        >
                                            ${new Date().toLocaleDateString()}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- BODY CONTENT -->
                        <tr>
                            <td align="center" style="padding: 40px 30px">
                                <table
                                    role="presentation"
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    style="
                                        background-color: #2b2b2b;
                                        border-radius: 20px;
                                        text-align: center;
                                        color: #ffffff;
                                        padding: 50px 25px;
                                    "
                                >
                                    <tr>
                                        <td>
                                            <h1
                                                style="
                                                    margin: 0;
                                                    font-size: 24px;
                                                    font-weight: 600;
                                                    color: #ffffff;
                                                "
                                            >
                                                🎉 Team Created Successfully!
                                            </h1>

                                            <p
                                                style="
                                                    margin: 20px 0 10px;
                                                    font-size: 16px;
                                                    font-weight: 500;
                                                "
                                            >
                                                Hi ${
                                                    message.name ||
                                                    'Participant'
                                                },
                                            </p>

                                            <p
                                                style="
                                                    margin: 10px 0 25px;
                                                    font-weight: 500;
                                                    line-height: 1.6;
                                                "
                                            >
                                                Congratulations! Your team has been
                                                successfully created for the event.
                                            </p>

                                            <p
                                                style="
                                                    margin: 10px 0;
                                                    font-size: 16px;
                                                    color: #c386ff;
                                                    font-weight: 600;
                                                "
                                            >
                                                🏆 Team Name: ${
                                                    message.teamName ||
                                                    'Your Team'
                                                }
                                            </p>

                                            <p
                                                style="
                                                    margin: 20px 0 10px;
                                                    color: #e0e0e0;
                                                "
                                            >
                                                Share this link with your teammates to let them join your team:
                                            </p>

                                            <a
                                                href="${message.teamLink}"
                                                style="
                                                    background-color: #c386ff;
                                                    color: #ffffff;
                                                    text-decoration: none;
                                                    font-weight: 600;
                                                    padding: 12px 25px;
                                                    border-radius: 8px;
                                                    display: inline-block;
                                                    margin-top: 10px;
                                                "
                                                >Join My Team</a
                                            >

                                            <p
                                                style="
                                                    margin-top: 35px;
                                                    color: #e0e0e0;
                                                "
                                            >
                                                You can also view your event ticket using the link below:
                                            </p>

                                            <a
                                                href="${message.ticket}"
                                                style="
                                                    background-color: #9d3bff;
                                                    color: #ffffff;
                                                    text-decoration: none;
                                                    font-weight: 600;
                                                    padding: 12px 25px;
                                                    border-radius: 8px;
                                                    display: inline-block;
                                                    margin-top: 10px;
                                                "
                                                >View My Ticket</a
                                            >

                                            <p
                                                style="
                                                    margin-top: 40px;
                                                    color: #cccccc;
                                                    font-size: 14px;
                                                    line-height: 1.6;
                                                "
                                            >
                                                Thank you for being part of this event.
                                                We wish you and your team the best of luck!
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                                <p
                                    style="
                                        max-width: 400px;
                                        margin: 60px auto 0;
                                        font-size: 12px;
                                        color: #ffffff;
                                        text-align: center;
                                    "
                                >
                                    Need help? Contact us at
                                    <a
                                        href="mailto:helpdesk@xcubit.in"
                                        style="
                                            color: #9d3bff;
                                            text-decoration: none;
                                        "
                                        >helpdesk@xcubit.in</a
                                    >.
                                </p>
                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td
                                align="center"
                                style="
                                    border-top: 1px solid #e6ebf1;
                                    padding: 20px 0;
                                    background-color: #2b2b2b;
                                "
                            >
                                <img
                                    src="https://www.xcubit.in/_next/static/media/logo.df47bba4.png"
                                    height="20"
                                    alt="Xcubit Logo"
                                />
                                <span
                                    style="
                                        font-weight: 700;
                                        color: #c0c0c0;
                                        font-size: 14px;
                                        margin-left: 5px;
                                    "
                                    >xcubit</span
                                >

                                <p
                                    style="
                                        margin: 10px 0 0;
                                        font-size: 10px;
                                        color: #a0a0a0;
                                    "
                                >
                                    61-C Rajouri Garden, New Delhi 110027
                                </p>

                                <div style="margin-top: 8px">
                                    <a
                                        href="https://www.instagram.com/xcubit_official/"
                                        target="_blank"
                                        style="
                                            display: inline-block;
                                            margin: 0 5px;
                                        "
                                    >
                                        <img
                                            src="https://paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_instagram.png"
                                            width="20"
                                            alt="Instagram"
                                        />
                                    </a>
                                    <a
                                        href="http://x.com/xcubit_official"
                                        target="_blank"
                                        style="
                                            display: inline-block;
                                            margin: 0 5px;
                                        "
                                    >
                                        <img
                                            src="https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_x.png"
                                            width="20"
                                            alt="Twitter"
                                        />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/xcubit/"
                                        target="_blank"
                                        style="
                                            display: inline-block;
                                            margin: 0 5px;
                                        "
                                    >
                                        <img
                                            src="https://paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_linkedin.png"
                                            width="20"
                                            alt="LinkedIn"
                                        />
                                    </a>
                                </div>

                                <p
                                    style="
                                        margin-top: 5px;
                                        color: #434343;
                                        font-size: 10px;
                                    "
                                >
                                    © ${new Date().getFullYear()} Xcubit. All
                                    rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>`;

        case 'reset':
            return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Request</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #e63946;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
      }
      .content h2 {
        color: #e63946;
        font-size: 20px;
        margin-bottom: 10px;
      }
      .content p {
        margin: 10px 0;
        line-height: 1.6;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 10px 0;
        background-color: #e63946;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
      }
      .footer {
        text-align: center;
        padding: 10px;
        background-color: #f5f5f5;
        font-size: 12px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Reset Your Password</h1>
      </div>
      <div class="content">
        <h2>Hello ${message.name || 'User'},</h2>
        <p>
          We received a request to reset your password. Click the button below to set up a new password for your account:
        </p>
        <a href="${message.resetLink || '#'}" class="button">Reset Password</a>
        <p>
          If you didn't request a password reset, please ignore this email or contact support at 
          <a href="mailto:'helpdesk@xcubit.in'}">helpdesk@xcubit.in</a>.
        </p>
        <p>This link will expire in 24 hours for your security.</p>
      </div>
      <div class="footer">
        <p>Need help? Contact us at <a href="mailto:'helpdesk@xcubit.in'}">helpdesk@xcubit.in</a>.</p>
      </div>
    </div>
  </body>
</html>
    `;

        case 'verify':
            return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Xcubit | Email Verification</title>
    </head>
    <body
        style="
            margin: 0;
            padding: 0;
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #ffffff;
            color: #434343;
        "
    >
        <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            style="background-color: #ffffff"
        >
            <tr>
                <td align="center">
                    <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        width="680"
                        style="
                            background-color: #1a1a1a;
                            background-image: url('https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80');
                            background-size: cover;
                            background-position: center top;
                            border-radius: 8px;
                            overflow: hidden;
                        "
                    >
                        <!-- HEADER -->
                        <tr>
                            <td style="padding: 30px">
                                <table
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                >
                                    <tr>
                                        <td
                                            valign="middle"
                                            style="color: #ffffff"
                                        >
                                            <img
                                                src="https://www.xcubit.in/_next/static/media/logo.df47bba4.png"
                                                height="35"
                                                alt="Xcubit Logo"
                                                style="vertical-align: middle"
                                            />
                                            <span
                                                style="
                                                    font-size: 25px;
                                                    font-weight: 600;
                                                    color: #ffffff;
                                                    vertical-align: middle;
                                                    margin-left: 8px;
                                                "
                                                >xcubit</span
                                            >
                                        </td>
                                        <td
                                            align="right"
                                            valign="middle"
                                            style="
                                                color: #ffffff;
                                                font-size: 14px;
                                            "
                                        >
                                            ${new Date().toLocaleDateString()}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- BODY -->
                        <tr>
                            <td align="center" style="padding: 40px 30px">
                                <table
                                    role="presentation"
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    style="
                                        background-color: #2b2b2b;
                                        border-radius: 20px;
                                        text-align: center;
                                        color: #ffffff;
                                        padding: 50px 25px;
                                    "
                                >
                                    <tr>
                                        <td>
                                            <h1
                                                style="
                                                    margin: 0;
                                                    font-size: 24px;
                                                    font-weight: 600;
                                                    color: #ffffff;
                                                "
                                            >
                                                Email Verification Required
                                            </h1>

                                            <p
                                                style="
                                                    margin: 20px 0 10px;
                                                    font-size: 16px;
                                                    font-weight: 500;
                                                "
                                            >
                                                Hi ${message.name || 'User'},
                                            </p>

                                            <p
                                                style="
                                                    margin: 10px 0 25px;
                                                    font-weight: 500;
                                                    line-height: 1.6;
                                                "
                                            >
                                                Thank you for signing up with
                                                <strong>Xcubit</strong>!<br />
                                                To complete your registration,
                                                please verify your email address
                                                by clicking the button below.
                                            </p>

                                            <a
                                                href="${message.verifyLink}"
                                                style="
                                                    background-color: #c386ff;
                                                    color: #ffffff;
                                                    text-decoration: none;
                                                    font-weight: 600;
                                                    padding: 12px 25px;
                                                    border-radius: 8px;
                                                    display: inline-block;
                                                    margin-top: 10px;
                                                "
                                                >Verify My Email</a
                                            >

                                            <p
                                                style="
                                                    margin-top: 30px;
                                                    color: #cccccc;
                                                    font-size: 14px;
                                                    line-height: 1.6;
                                                "
                                            >
                                                If you did not sign up for this
                                                account, please ignore this
                                                email. Your email address will
                                                not be registered unless you
                                                verify it.
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                                <p
                                    style="
                                        max-width: 400px;
                                        margin: 60px auto 0;
                                        font-size: 12px;
                                        color: #ffffff;
                                        text-align: center;
                                        line-height: 1.6;
                                    "
                                >
                                    Need help? Contact us at
                                    <a
                                        href="mailto:helpdesk@xcubit.in"
                                        style="
                                            color: #9d3bff;
                                            text-decoration: none;
                                        "
                                        >helpdesk@xcubit.in</a
                                    >.
                                </p>
                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td
                                align="center"
                                style="
                                    border-top: 1px solid #e6ebf1;
                                    padding: 20px 0;
                                    background-color: #2b2b2b;
                                "
                            >
                                <img
                                    src="https://www.xcubit.in/_next/static/media/logo.df47bba4.png"
                                    height="20"
                                    alt="Xcubit Logo"
                                />
                                <span
                                    style="
                                        font-weight: 700;
                                        color: #c0c0c0;
                                        font-size: 14px;
                                        margin-left: 5px;
                                    "
                                    >xcubit</span
                                >

                                <p
                                    style="
                                        margin: 10px 0 0;
                                        font-size: 10px;
                                        color: #a0a0a0;
                                    "
                                >
                                    61-C Rajouri Garden, New Delhi 110027
                                </p>

                                <div style="margin-top: 8px">
                                    <a
                                        href="https://www.instagram.com/xcubit_official/"
                                        target="_blank"
                                        style="
                                            display: inline-block;
                                            margin: 0 5px;
                                        "
                                    >
                                        <img
                                            src="https://paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_instagram.png"
                                            width="20"
                                            alt="Instagram"
                                        />
                                    </a>
                                    <a
                                        href="http://x.com/xcubit_official"
                                        target="_blank"
                                        style="
                                            display: inline-block;
                                            margin: 0 5px;
                                        "
                                    >
                                        <img
                                            src="https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_x.png"
                                            width="20"
                                            alt="Twitter"
                                        />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/xcubit/"
                                        target="_blank"
                                        style="
                                            display: inline-block;
                                            margin: 0 5px;
                                        "
                                    >
                                        <img
                                            src="https://paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_linkedin.png"
                                            width="20"
                                            alt="LinkedIn"
                                        />
                                    </a>
                                </div>

                                <p
                                    style="
                                        margin-top: 5px;
                                        color: #434343;
                                        font-size: 10px;
                                    "
                                >
                                    © ${new Date().getFullYear()} Xcubit. All
                                    rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
            `;

        case 'ticket':
            return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Xcubit | Event Ticket</title>
    </head>
    <body
        style="
            margin: 0;
            padding: 0;
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #ffffff;
            color: #434343;
        "
    >
        <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            style="background-color: #ffffff"
        >
            <tr>
                <td align="center">
                    <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        width="680"
                        style="
                            background-color: #1a1a1a;
                            background-image: url('https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80');
                            background-size: cover;
                            background-position: center top;
                            border-radius: 8px;
                            overflow: hidden;
                        "
                    >
                        <!-- HEADER -->
                        <tr>
                            <td style="padding: 30px">
                                <table
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                >
                                    <tr>
                                        <td valign="middle" style="color: #ffffff">
                                            <img
                                                src="https://www.xcubit.in/_next/static/media/logo.df47bba4.png"
                                                height="35"
                                                alt="Xcubit Logo"
                                                style="vertical-align: middle"
                                            />
                                            <span
                                                style="
                                                    font-size: 25px;
                                                    font-weight: 600;
                                                    color: #ffffff;
                                                    vertical-align: middle;
                                                    margin-left: 8px;
                                                "
                                                >xcubit</span
                                            >
                                        </td>
                                        <td
                                            align="right"
                                            valign="middle"
                                            style="color: #ffffff; font-size: 14px"
                                        >
                                            ${new Date().toLocaleDateString()}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- BODY -->
                        <tr>
                            <td align="center" style="padding: 40px 30px">
                                <table
                                    role="presentation"
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    style="
                                        background-color: #2b2b2b;
                                        border-radius: 20px;
                                        text-align: center;
                                        color: #ffffff;
                                        padding: 50px 25px;
                                    "
                                >
                                    <tr>
                                        <td>
                                            <h1
                                                style="
                                                    margin: 0;
                                                    font-size: 24px;
                                                    font-weight: 600;
                                                    color: #ffffff;
                                                "
                                            >
                                                Your Event Ticket
                                            </h1>

                                            <p
                                                style="
                                                    margin: 20px 0 10px;
                                                    font-size: 16px;
                                                    font-weight: 500;
                                                "
                                            >
                                                Hi ${
                                                    message.name || 'Attendee'
                                                },
                                            </p>

                                            <p
                                                style="
                                                    margin: 10px 0 20px;
                                                    font-weight: 500;
                                                    line-height: 1.6;
                                                "
                                            >
                                                Thank you for registering for the
                                                <strong>${
                                                    message.event || 'Event'
                                                }</strong>!  
                                                We’re thrilled to have you join us.  
                                                Below are your ticket details:
                                            </p>

                                            <table
                                                role="presentation"
                                                cellpadding="0"
                                                cellspacing="0"
                                                border="0"
                                                width="100%"
                                                style="
                                                    background-color: #3b3b3b;
                                                    border-radius: 8px;
                                                    padding: 20px;
                                                    color: #ffffff;
                                                    text-align: left;
                                                    font-size: 14px;
                                                "
                                            >
                                                <tr>
                                                    <td>
                                                        <p><strong>Event:</strong> ${
                                                            message.event ||
                                                            'N/A'
                                                        }</p>
                                                        <p><strong>Order ID:</strong> ${
                                                            message.orderId ||
                                                            'N/A'
                                                        }</p>
                                                        <p><strong>Ticket ID:</strong> ${
                                                            message.ticketId ||
                                                            'N/A'
                                                        }</p>
                                                        <p><strong>Date:</strong> ${
                                                            message.date ||
                                                            'N/A'
                                                        }</p>
                                                        <p><strong>Location:</strong> ${
                                                            message.location ||
                                                            'N/A'
                                                        }</p>
                                                    </td>
                                                </tr>
                                            </table>

                                            <p
                                                style="
                                                    margin-top: 15px;
                                                    line-height: 1.5;
                                                    color: #d3d3d3;
                                                "
                                            >
                                                Please bring a valid ID along with ticket on dashboard when attending the event.
                                            </p>

                                            <a
                                                href="${message.mapLink || '#'}"
                                                style="
                                                    background-color: #c386ff;
                                                    color: #ffffff;
                                                    text-decoration: none;
                                                    font-weight: 600;
                                                    padding: 12px 25px;
                                                    border-radius: 8px;
                                                    display: inline-block;
                                                    margin-top: 20px;
                                                "
                                                >View Location</a
                                            >
                                        </td>
                                    </tr>
                                </table>

                                <p
                                    style="
                                        max-width: 400px;
                                        margin: 60px auto 0;
                                        font-size: 12px;
                                        color: #ffffff;
                                        text-align: center;
                                        line-height: 1.6;
                                    "
                                >
                                    Need help? Contact us at
                                    <a
                                        href="mailto:helpdesk@xcubit.in"
                                        style="color: #9d3bff; text-decoration: none"
                                        >helpdesk@xcubit.in</a
                                    >.
                                </p>
                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td
                                align="center"
                                style="
                                    border-top: 1px solid #e6ebf1;
                                    padding: 20px 0;
                                    background-color: #2b2b2b;
                                "
                            >
                                <img
                                    src="https://www.xcubit.in/_next/static/media/logo.df47bba4.png"
                                    height="20"
                                    alt="Xcubit Logo"
                                />
                                <span
                                    style="
                                        font-weight: 700;
                                        color: #c0c0c0;
                                        font-size: 14px;
                                        margin-left: 5px;
                                    "
                                    >xcubit</span
                                >

                                <p
                                    style="
                                        margin: 10px 0 0;
                                        font-size: 10px;
                                        color: #a0a0a0;
                                    "
                                >
                                    61-C Rajouri Garden, New Delhi 110027
                                </p>

                                <div style="margin-top: 8px">
                                    <a
                                        href="https://www.instagram.com/xcubit_official/"
                                        target="_blank"
                                        style="display: inline-block; margin: 0 5px"
                                    >
                                        <img
                                            src="https://paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_instagram.png"
                                            width="20"
                                            alt="Instagram"
                                        />
                                    </a>
                                    <a
                                        href="http://x.com/xcubit_official"
                                        target="_blank"
                                        style="display: inline-block; margin: 0 5px"
                                    >
                                        <img
                                            src="https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_x.png"
                                            width="20"
                                            alt="Twitter"
                                        />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/xcubit/"
                                        target="_blank"
                                        style="display: inline-block; margin: 0 5px"
                                    >
                                        <img
                                            src="https://paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_linkedin.png"
                                            width="20"
                                            alt="LinkedIn"
                                        />
                                    </a>
                                </div>

                                <p
                                    style="
                                        margin-top: 5px;
                                        color: #434343;
                                        font-size: 10px;
                                    "
                                >
                                    © ${new Date().getFullYear()} Xcubit. All rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>

            `;

        case 'college-registration':
            return `
            <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Xcubit</title>
    </head>
    <body
        style="
            margin: 0;
            padding: 0;
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #ffffff;
            color: #434343;
        "
    >
        <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            style="background-color: #ffffff"
        >
            <tr>
                <td align="center">
                    <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        width="680"
                        style="
                            background-color: #1a1a1a;
                            background-image: url('https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80');
                            background-size: cover;
                            background-position: center top;
                            border-radius: 8px;
                            overflow: hidden;
                        "
                    >
                        <!-- HEADER -->
                        <tr>
                            <td style="padding: 30px">
                                <table
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                >
                                    <tr>
                                        <td
                                            valign="middle"
                                            style="color: #ffffff"
                                        >
                                            <img
                                                src="https://www.xcubit.in/_next/static/media/logo.df47bba4.png"
                                                height="35"
                                                alt="Xcubit Logo"
                                                style="vertical-align: middle"
                                            />
                                            <span
                                                style="
                                                    font-size: 25px;
                                                    font-weight: 600;
                                                    color: #ffffff;
                                                    vertical-align: middle;
                                                    margin-left: 8px;
                                                "
                                                >xcubit</span
                                            >
                                        </td>
                                        <td
                                            align="right"
                                            valign="middle"
                                            style="
                                                color: #ffffff;
                                                font-size: 14px;
                                            "
                                        >
                                            ${new Date().toLocaleDateString()}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- BODY CONTENT -->
                        <tr>
                            <td align="center" style="padding: 40px 30px">
                                <table
                                    role="presentation"
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    style="
                                        background-color: #2b2b2b;
                                        border-radius: 20px;
                                        text-align: center;
                                        color: #ffffff;
                                        padding: 50px 25px;
                                    "
                                >
                                    <tr>
                                        <td>
                                            <h1
                                                style="
                                                    margin: 0;
                                                    font-size: 24px;
                                                    font-weight: 600;
                                                    color: #ffffff;
                                                "
                                            >
                                                Email Verification Required
                                            </h1>
                                            <p
                                                style="
                                                    margin: 20px 0 10px;
                                                    font-size: 16px;
                                                    font-weight: 500;
                                                "
                                            >
                                                Hi ${message.name || 'User'},
                                            </p>
                                            <p
                                                style="
                                                    margin: 10px 0 20px;
                                                    font-weight: 500;
                                                    line-height: 1.6;
                                                "
                                            >
                                                Your institute is now registered
                                                with
                                                <strong>Xcubit.in</strong
                                                >.<br />
                                                Kindly sign up using
                                                <span style="color: #c386ff"
                                                    >${
                                                        message.email ||
                                                        'current email'
                                                    }</span
                                                >
                                                to continue and host your
                                                internal ideathon!<br /><br />
                                                Complete your registration by
                                                logging in and verifying your
                                                email.
                                            </p>

                                            <table
                                                role="presentation"
                                                cellpadding="0"
                                                cellspacing="0"
                                                border="0"
                                                align="center"
                                                style="margin: 30px auto"
                                            >
                                                <tr>
                                                    <td align="center">
                                                        <a
                                                            href="https://www.xcubit.in/login"
                                                            style="
                                                                background-color: #c386ff;
                                                                color: #ffffff;
                                                                text-decoration: none;
                                                                font-weight: 600;
                                                                padding: 12px
                                                                    25px;
                                                                border-radius: 8px;
                                                                display: inline-block;
                                                            "
                                                            >Login</a
                                                        >
                                                        ${
                                                            message.verifyLink
                                                                ? `<a
                                                            href="${message.verifyLink}"
                                                            style="
                                                                background-color: #ba3d4f;
                                                                color: #ffffff;
                                                                text-decoration: none;
                                                                font-weight: 600;
                                                                padding: 12px
                                                                    25px;
                                                                border-radius: 8px;
                                                                display: inline-block;
                                                                margin-left: 10px;
                                                            "
                                                            >Verify My Email</a
                                                        >`
                                                                : ''
                                                        }
                                                    </td>
                                                </tr>
                                            </table>

                                            <p
                                                style="
                                                    margin-top: 30px;
                                                    font-size: 13px;
                                                    color: #cccccc;
                                                    line-height: 1.5;
                                                "
                                            >
                                                If you did not sign up for this
                                                account, please ignore this
                                                email. Your email address will
                                                not be registered unless
                                                verified.
                                            </p>

                                            <div
                                                style="
                                                    margin-top: 40px;
                                                    text-align: left;
                                                    color: #d3d3d3;
                                                "
                                            >
                                                <h3
                                                    style="
                                                        font-size: 16px;
                                                        font-weight: 600;
                                                        color: #ffffff;
                                                    "
                                                >
                                                    Getting Started
                                                </h3>
                                                <ul
                                                    style="
                                                        padding-left: 15px;
                                                        line-height: 1.8;
                                                    "
                                                >
                                                    <li>
                                                        <strong>Login:</strong>
                                                        Visit
                                                        <a
                                                            href="https://www.xcubit.in/login"
                                                            style="
                                                                color: #c386ff;
                                                                text-decoration: none;
                                                            "
                                                            >xcubit.in/login</a
                                                        >
                                                        and sign in using your
                                                        registered email.
                                                    </li>
                                                    <li>
                                                        <strong
                                                            >Verify
                                                            Email:</strong
                                                        >
                                                        Click the verification
                                                        link sent to your inbox.
                                                    </li>
                                                    <li>
                                                        <strong
                                                            >Access
                                                            Dashboard:</strong
                                                        >
                                                        Visit
                                                        <a
                                                            href="https://www.xcubit.in/institute"
                                                            style="
                                                                color: #c386ff;
                                                                text-decoration: none;
                                                            "
                                                            >xcubit.in/institute</a
                                                        >
                                                        to manage your events
                                                        and teams.
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </table>

                                <p
                                    style="
                                        max-width: 400px;
                                        margin: 60px auto 0;
                                        font-size: 12px;
                                        color: #ffffff;
                                        text-align: center;
                                    "
                                >
                                    Need help? Contact us at
                                    <a
                                        href="mailto:helpdesk@xcubit.in"
                                        style="
                                            color: #9d3bff;
                                            text-decoration: none;
                                        "
                                        >helpdesk@xcubit.in</a
                                    >
                                    or visit our
                                    <a
                                        href="https://www.xcubit.in/contact"
                                        style="
                                            color: #9d3bff;
                                            text-decoration: none;
                                        "
                                        >Help Center</a
                                    >.
                                </p>
                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td
                                align="center"
                                style="
                                    border-top: 1px solid #e6ebf1;
                                    padding: 20px 0;
                                    background-color: #2b2b2b;
                                "
                            >
                                <img
                                    src="https://www.xcubit.in/_next/static/media/logo.df47bba4.png"
                                    height="20"
                                    alt="Xcubit Logo"
                                />
                                <span
                                    style="
                                        font-weight: 700;
                                        color: #c0c0c0;
                                        font-size: 14px;
                                        margin-left: 5px;
                                    "
                                    >xcubit</span
                                >
                                <p
                                    style="
                                        margin: 10px 0 0;
                                        font-size: 10px;
                                        color: #434343;
                                    "
                                >
                                    61-C Rajouri Garden, New Delhi 110027
                                </p>
                                <div style="margin-top: 8px">
                                    <a
                                        href="https://www.instagram.com/xcubit_official/"
                                        target="_blank"
                                        style="
                                            display: inline-block;
                                            margin: 0 5px;
                                        "
                                    >
                                        <img
                                            src="https://paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_instagram.png"
                                            width="20"
                                            alt="Instagram"
                                        />
                                    </a>
                                    <a
                                        href="http://x.com/xcubit_official"
                                        target="_blank"
                                        style="
                                            display: inline-block;
                                            margin: 0 5px;
                                        "
                                    >
                                        <img
                                            src="https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_x.png"
                                            width="20"
                                            alt="Twitter"
                                        />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/xcubit/"
                                        target="_blank"
                                        style="
                                            display: inline-block;
                                            margin: 0 5px;
                                        "
                                    >
                                        <img
                                            src="https://paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_linkedin.png"
                                            width="20"
                                            alt="LinkedIn"
                                        />
                                    </a>
                                </div>
                                <p
                                    style="
                                        margin-top: 5px;
                                        color: #434343;
                                        font-size: 10px;
                                    "
                                >
                                    © ${new Date().getFullYear()} Xcubit. All
                                    rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>

            `;

        default:
            return `
            <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #004aad;
        color: white;
        padding: 15px 20px;
        border-radius: 8px 8px 0 0;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 22px;
      }
      .content {
        padding: 20px;
      }
      .content p {
        margin: 10px 0;
        line-height: 1.6;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 15px 0;
        background-color: #004aad;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-size: 14px;
      }
      .footer {
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #666;
        background-color: #f5f5f5;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Notification</h1>
      </div>
      <div class="content">
        <p>${message || 'This is a generic notification message.'}</p>
        ${
            message.actionLink ? (
                <a href="${message.actionLink}" class="button">
                    ${message.actionText || 'Take Action'}
                </a>
            ) : (
                ''
            )
        }
      </div>
      <div class="footer">
        <p>
          If you have any questions, please contact us at 
          <a href="mailto:${message.contactEmail || 'support@example.com'}">${
                message.contactEmail || 'support@example.com'
            }</a>.
        </p>
        <p>©️ ${new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`;
    }
}
