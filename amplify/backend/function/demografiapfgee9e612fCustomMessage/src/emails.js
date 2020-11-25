exports.accountConfirmation = (link) => `<div
style="max-width:100%; background: #ffffff; padding: 20px; font-family: Open Sans, Helvetica, Arial, sans-serif; font-weight: 400; color: #333; font-size: 16px;">
<table style="max-width:600px; margin: 0 auto; border: 1px solid #f4f4f4;  border-radius:20px;">
  <tbody>
    <tr style=" text-align: center;">
      <td style="padding:20px;" colspan="2">
        <img
          src="https://www.uned.es/universidad/dam/jcr:595a2ad3-a77e-4479-bf2a-f3f519258be4/595a2ad3-a77e-4479-bf2a-f3f519258be4"
          alt="UNED" style="max-width: 250px;"></td>
    </tr>
    <tr style="background: #fff;">
      <td style="padding: 10px 20px; line-height:2;" colspan="2">
        <p>Hola</p>
        <p>Bienvenido a Estimación Demográfica PFG.</p>
        <p>Haz click en el siguiente enlace para confirmar tu cuenta y aceptar nuestra <a
            href="https://descargas.uned.es/publico/pdf/Politica_privacidad_UNED.pdf" style="color: #00a9e5;">Política
            de privacidad</a>.</p>
        <table cellpadding="0" cellspacing="0"
          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; min-width:100%; margin-top: 30px; margin-bottom: 30px"
          width="100%">
          <tbody>
            <tr>
              <td align="center" class="mktEditable" id="button-1"
                style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; padding:0 50px;">
                <a bgcolor="#0d553f" class="btn" href=${link}
                  style="border: 0; text-decoration: none; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; color: #fff; display:inline-block; border-top:10px solid #0d553f; border-right:20px solid #0d553f; border-bottom:10px solid #0d553f; border-left:20px solid #0d553f; -webkit-border-radius:4px; -moz-border-radius:4px; border-radius:4px; font-family:'Open Sans', Arial, sans-serif; font-size:16px; font-weight:600; text-decoration:none; color:#ffffff; background: #0d553f;"
                  target="_blank">
                  Aceptar y confirmar cuenta
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <p style="text-align: right;">Reciba un cordial saludo,<br>UNED.</p>
        <hr style="background-color: #f4f4f4; height: 2px; border: 0;">
      </td>
    </tr>
    <tr style="color:#0d553f; text-align: center;">
      <td style="padding:0px 20px 20px 0px;">
        <p style="text-align: right;"><small>© 2020 · UNED</small></p>
      </td>
    </tr>
  </tbody>
</table>
</div>
`;