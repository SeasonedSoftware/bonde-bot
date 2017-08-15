import 'colors'
import request from 'request'

export default ({ profile, botData, interaction }) => {
  if (botData.data.pressure) {
    const { widget_id: widgetId } = botData.data.pressure

    if (widgetId) {
      const widget = global.widgets[widgetId]

      if (widget) {
        const { settings } = widget

        const activist = {
          firstname: profile.first_name,
          lastname: profile.last_name,
          email: interaction.payload.message.text,
        }
        const mail = {
          cc: settings.targets.split(';'),
          subject: settings.pressure_subject,
          body: settings.pressure_body,
        }

        const url = `${process.env.API_URL}/widgets/${widgetId}/fill`
        const payload = { form: { fill: { activist, mail } } }
        request.post(url, payload)
      }
      else console.error('The widget_id specified on bot config do not match'.red)
    }
    else console.error('The widget_id was not specified'.red)
  }
  else console.error('No pressure object defined on bot config data'.red)
}
