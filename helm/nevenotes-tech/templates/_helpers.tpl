{{- define "nevenotes-tech.fullname" -}}
{{- .Release.Name -}}
{{- end -}}

{{- define "nevenotes-tech.labels" -}}
app.kubernetes.io/name: {{ include "nevenotes-tech.fullname" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "nevenotes-tech.selectorLabels" -}}
app.kubernetes.io/name: {{ include "nevenotes-tech.fullname" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{- define "nevenotes-tech.secretName" -}}
{{- if .Values.secret.existingSecret -}}
{{- .Values.secret.existingSecret -}}
{{- else -}}
{{- include "nevenotes-tech.fullname" . -}}-secret
{{- end -}}
{{- end -}}
