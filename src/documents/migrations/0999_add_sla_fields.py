from django.db import migrations, models
import django.db.models.deletion
from django.conf import settings

class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('documents', '1049_document_deleted_at_document_restored_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='sla_processing_deadline',
            field=models.DateTimeField(
                blank=True,
                null=True,
                verbose_name='SLA processing deadline',
                help_text='The deadline for processing this document'
            ),
        ),
        migrations.AddField(
            model_name='document',
            name='sla_responsible_user',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name='sla_documents',
                to=settings.AUTH_USER_MODEL,
                verbose_name='SLA responsible user'
            ),
        ),
        migrations.AddField(
            model_name='document',
            name='sla_status',
            field=models.CharField(
                blank=True,
                choices=[
                    ('on_track', 'On Track'),
                    ('approaching_deadline', 'Approaching Deadline'),
                    ('overdue', 'Overdue')
                ],
                max_length=20,
                null=True,
                verbose_name='SLA status'
            ),
        ),
        migrations.AddField(
            model_name='document',
            name='sla_processing_days',
            field=models.PositiveIntegerField(
                blank=True,
                null=True,
                verbose_name='SLA processing days',
                help_text='Number of days allowed for processing this document'
            ),
        ),
    ]
