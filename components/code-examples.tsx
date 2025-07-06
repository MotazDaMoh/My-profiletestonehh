"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Code, FileText, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { EmbedBuilder } from "@/lib/embed-builder"

interface EmbedData {
  webhook: {
    url: string
    name: string
    avatar: string
    content: string
  }
  embed: {
    title: string
    description: string
    url: string
    color: string
    timestamp: Date | null
    author: {
      name: string
      url: string
      icon_url: string
    }
    thumbnail: string
    image: string
    fields: Array<{
      name: string
      value: string
      inline: boolean
    }>
    footer: {
      text: string
      icon_url: string
    }
  }
}

interface CodeExamplesProps {
  embedData: EmbedData
}

export function CodeExamples({ embedData }: CodeExamplesProps) {
  const { toast } = useToast()
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (code: string, type: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(type)
      toast({
        title: "تم النسخ!",
        description: `تم نسخ كود ${type} إلى الحافظة.`,
      })
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (error) {
      toast({
        title: "فشل في النسخ",
        description: "لم يتم نسخ الكود. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      })
    }
  }

  // Generate EmbedBuilder JavaScript code
  const generateEmbedBuilderCode = () => {
    // Create EmbedBuilder instance
    const builder = new EmbedBuilder()

    if (embedData.embed.title) builder.setTitle(embedData.embed.title)
    if (embedData.embed.description) builder.setDescription(embedData.embed.description)
    if (embedData.embed.url) builder.setURL(embedData.embed.url)
    if (embedData.embed.color) builder.setColor(embedData.embed.color)
    if (embedData.embed.timestamp) builder.setTimestamp(embedData.embed.timestamp)

    if (embedData.embed.author.name) {
      builder.setAuthor({
        name: embedData.embed.author.name,
        url: embedData.embed.author.url || undefined,
        icon_url: embedData.embed.author.icon_url || undefined,
      })
    }

    if (embedData.embed.footer.text) {
      builder.setFooter({
        text: embedData.embed.footer.text,
        icon_url: embedData.embed.footer.icon_url || undefined,
      })
    }

    if (embedData.embed.image) builder.setImage(embedData.embed.image)
    if (embedData.embed.thumbnail) builder.setThumbnail(embedData.embed.thumbnail)

    embedData.embed.fields.forEach((field) => {
      builder.addField(field.name, field.value, field.inline)
    })

    const embedCode = builder.toCode()

    return `// Discord Embed Builder - Modern JavaScript/TypeScript
// Install: npm install discord.js
// Or use our custom EmbedBuilder class

import { EmbedBuilder } from './lib/embed-builder';
// Or: const { EmbedBuilder } = require('discord.js');

// Method 1: Using EmbedBuilder Pattern (Recommended)
${embedCode};

// Method 2: Send via Webhook
const webhookUrl = '${embedData.webhook.url}';

async function sendEmbedWithBuilder() {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: '${embedData.webhook.name}',
        avatar_url: '${embedData.webhook.avatar}',
        content: '${embedData.webhook.content}',
        embeds: [embed.toJSON()], // Convert builder to JSON
      }),
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    console.log('✅ Embed sent successfully!');
    return await response.json();
  } catch (error) {
    console.error('❌ Failed to send embed:', error);
    throw error;
  }
}

// Method 3: Advanced Webhook Manager Class
class DiscordWebhookManager {
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl;
    this.validateWebhookUrl(webhookUrl);
  }

  validateWebhookUrl(url) {
    const pattern = /https:\\/\\/discord\\.com\\/api\\/webhooks\\/\\d+\\/[\\w-]+/;
    if (!pattern.test(url)) {
      throw new Error('Invalid webhook URL format');
    }
  }

  async sendEmbed(embedBuilder, options = {}) {
    const payload = {
      embeds: [embedBuilder.toJSON()],
      ...options
    };

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(\`Discord API Error: \${response.status} - \${errorData.message || 'Unknown error'}\`);
      }

      console.log('✅ Embed sent successfully via manager!');
      return true;
    } catch (error) {
      console.error('❌ Failed to send embed:', error);
      return false;
    }
  }

  // Create common embed templates
  createInfoEmbed(title, description) {
    return new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(0x3498db)
      .setTimestamp();
  }

  createSuccessEmbed(title, description) {
    return new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(0x2ecc71)
      .setTimestamp();
  }

  createErrorEmbed(title, description) {
    return new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(0xe74c3c)
      .setTimestamp();
  }
}

// Usage Examples:
async function examples() {
  // Basic usage
  await sendEmbedWithBuilder();

  // Advanced usage with manager
  const webhookManager = new DiscordWebhookManager('${embedData.webhook.url}');
  
  // Send custom embed
  await webhookManager.sendEmbed(embed, {
    username: '${embedData.webhook.name}',
    avatar_url: '${embedData.webhook.avatar}',
  });

  // Send template embeds
  const infoEmbed = webhookManager.createInfoEmbed('Info', 'This is an info message');
  await webhookManager.sendEmbed(infoEmbed);

  // Chain multiple operations
  const complexEmbed = new EmbedBuilder()
    .setTitle('Complex Embed')
    .setDescription('This embed was built with method chaining')
    .setColor(0x9b59b6)
    .addField('Field 1', 'Value 1', true)
    .addField('Field 2', 'Value 2', true)
    .addField('Field 3', 'Value 3', false)
    .setFooter({ text: 'Built with EmbedBuilder' })
    .setTimestamp();

  await webhookManager.sendEmbed(complexEmbed);
}

// Run examples
examples().catch(console.error);`
  }

  // Generate Python code with builder pattern
  const generatePythonBuilderCode = () => {
    return `#!/usr/bin/env python3
# Discord Embed Builder - Python Implementation
# Install: pip install requests

import requests
import json
from datetime import datetime
from typing import Optional, Dict, Any, List
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EmbedBuilder:
    """Python implementation of Discord EmbedBuilder pattern"""
    
    def __init__(self):
        self.data = {}
    
    def set_title(self, title: str) -> 'EmbedBuilder':
        """Set the title of the embed"""
        self.data['title'] = title
        return self
    
    def set_description(self, description: str) -> 'EmbedBuilder':
        """Set the description of the embed"""
        self.data['description'] = description
        return self
    
    def set_url(self, url: str) -> 'EmbedBuilder':
        """Set the URL of the embed"""
        self.data['url'] = url
        return self
    
    def set_color(self, color: int) -> 'EmbedBuilder':
        """Set the color of the embed"""
        self.data['color'] = color
        return self
    
    def set_timestamp(self, timestamp: Optional[datetime] = None) -> 'EmbedBuilder':
        """Set the timestamp of the embed"""
        if timestamp is None:
            timestamp = datetime.now()
        self.data['timestamp'] = timestamp.isoformat()
        return self
    
    def set_author(self, name: str, url: Optional[str] = None, icon_url: Optional[str] = None) -> 'EmbedBuilder':
        """Set the author of the embed"""
        author = {'name': name}
        if url:
            author['url'] = url
        if icon_url:
            author['icon_url'] = icon_url
        self.data['author'] = author
        return self
    
    def set_footer(self, text: str, icon_url: Optional[str] = None) -> 'EmbedBuilder':
        """Set the footer of the embed"""
        footer = {'text': text}
        if icon_url:
            footer['icon_url'] = icon_url
        self.data['footer'] = footer
        return self
    
    def set_image(self, url: str) -> 'EmbedBuilder':
        """Set the image of the embed"""
        self.data['image'] = {'url': url}
        return self
    
    def set_thumbnail(self, url: str) -> 'EmbedBuilder':
        """Set the thumbnail of the embed"""
        self.data['thumbnail'] = {'url': url}
        return self
    
    def add_field(self, name: str, value: str, inline: bool = False) -> 'EmbedBuilder':
        """Add a field to the embed"""
        if 'fields' not in self.data:
            self.data['fields'] = []
        self.data['fields'].append({
            'name': name,
            'value': value,
            'inline': inline
        })
        return self
    
    def clear_fields(self) -> 'EmbedBuilder':
        """Clear all fields"""
        self.data['fields'] = []
        return self
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        return {k: v for k, v in self.data.items() if v is not None}

class DiscordWebhookManager:
    """Advanced Discord Webhook Manager with EmbedBuilder support"""
    
    def __init__(self, webhook_url: str):
        self.webhook_url = webhook_url
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'User-Agent': 'Discord-Webhook-Python/3.0'
        })
        self._validate_webhook_url(webhook_url)
    
    def _validate_webhook_url(self, url: str) -> None:
        """Validate webhook URL format"""
        import re
        pattern = r'https://discord\\.com/api/webhooks/\\d+/[\\w-]+'
        if not re.match(pattern, url):
            raise ValueError("Invalid webhook URL format")
    
    def send_embed(self, embed_builder: EmbedBuilder, **kwargs) -> bool:
        """Send embed using EmbedBuilder"""
        payload = {
            'embeds': [embed_builder.to_dict()],
            **kwargs
        }
        
        try:
            response = self.session.post(self.webhook_url, json=payload, timeout=30)
            response.raise_for_status()
            
            logger.info(f"✅ Embed sent successfully: {response.status_code}")
            return True
            
        except requests.exceptions.RequestException as e:
            logger.error(f"❌ Failed to send embed: {e}")
            return False
    
    def create_info_embed(self, title: str, description: str) -> EmbedBuilder:
        """Create info embed template"""
        return (EmbedBuilder()
                .set_title(title)
                .set_description(description)
                .set_color(0x3498db)
                .set_timestamp())
    
    def create_success_embed(self, title: str, description: str) -> EmbedBuilder:
        """Create success embed template"""
        return (EmbedBuilder()
                .set_title(title)
                .set_description(description)
                .set_color(0x2ecc71)
                .set_timestamp())
    
    def create_error_embed(self, title: str, description: str) -> EmbedBuilder:
        """Create error embed template"""
        return (EmbedBuilder()
                .set_title(title)
                .set_description(description)
                .set_color(0xe74c3c)
                .set_timestamp())

def main():
    """Main function demonstrating EmbedBuilder usage"""
    
    # Initialize webhook manager
    webhook_url = '${embedData.webhook.url}'
    manager = DiscordWebhookManager(webhook_url)
    
    # Create embed using builder pattern
    embed = (EmbedBuilder()${embedData.embed.title ? `\n             .set_title('${embedData.embed.title.replace(/'/g, "\\'")}')` : ""}${embedData.embed.description ? `\n             .set_description('${embedData.embed.description.replace(/'/g, "\\'")}')` : ""}${embedData.embed.color ? `\n             .set_color(${Number.parseInt(embedData.embed.color.replace("#", ""), 16)})` : ""}${embedData.embed.timestamp ? `\n             .set_timestamp()` : ""}${embedData.embed.author.name ? `\n             .set_author('${embedData.embed.author.name.replace(/'/g, "\\'")}', ${embedData.embed.author.url ? `'${embedData.embed.author.url}'` : "None"}, ${embedData.embed.author.icon_url ? `'${embedData.embed.author.icon_url}'` : "None"})` : ""}${embedData.embed.footer.text ? `\n             .set_footer('${embedData.embed.footer.text.replace(/'/g, "\\'")}', ${embedData.embed.footer.icon_url ? `'${embedData.embed.footer.icon_url}'` : "None"})` : ""}${embedData.embed.image ? `\n             .set_image('${embedData.embed.image}')` : ""}${embedData.embed.thumbnail ? `\n             .set_thumbnail('${embedData.embed.thumbnail}')` : ""}${embedData.embed.fields.map((field) => `\n             .add_field('${field.name.replace(/'/g, "\\'")}', '${field.value.replace(/'/g, "\\'")}', ${field.inline})`).join("")})
    
    # Send the embed
    success = manager.send_embed(
        embed,
        username='${embedData.webhook.name}',
        avatar_url='${embedData.webhook.avatar}',
        content='${embedData.webhook.content}'
    )
    
    if success:
        print("🎉 Embed sent successfully!")
    else:
        print("💥 Failed to send embed!")
    
    # Example: Send template embeds
    info_embed = manager.create_info_embed("Information", "This is an info message")
    manager.send_embed(info_embed)
    
    # Example: Complex embed with method chaining
    complex_embed = (EmbedBuilder()
                    .set_title("Complex Embed Example")
                    .set_description("This demonstrates advanced EmbedBuilder usage")
                    .set_color(0x9b59b6)
                    .add_field("Field 1", "Value 1", True)
                    .add_field("Field 2", "Value 2", True)
                    .add_field("Full Width Field", "This field spans the full width", False)
                    .set_footer("Built with Python EmbedBuilder")
                    .set_timestamp())
    
    manager.send_embed(complex_embed)

if __name__ == "__main__":
    main()`
  }

  const jsBuilderCode = generateEmbedBuilderCode()
  const pythonBuilderCode = generatePythonBuilderCode()

  return (
    <Card className="apple-card-elevated">
      <CardContent className="p-6 sm:p-8 lg:p-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Code className="h-6 w-6 sm:h-8 sm:w-8 text-white" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h2 className="apple-body-large font-semibold">EmbedBuilder Pattern</h2>
            <p className="apple-caption apple-text-gray">كود محسّن باستخدام نمط البناء المتسلسل</p>
          </div>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full">
            <Zap className="h-3 w-3 ml-1" />
            محسّن
          </Badge>
        </div>

        <Tabs defaultValue="javascript" className="w-full">
          <TabsList className="apple-vibrancy p-1 sm:p-2 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 w-full sm:w-auto">
            <TabsTrigger
              value="javascript"
              className="rounded-lg sm:rounded-xl apple-body flex items-center gap-2 flex-1 sm:flex-initial text-xs sm:text-sm"
            >
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              JavaScript
              <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                ES6+
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="python"
              className="rounded-lg sm:rounded-xl apple-body flex items-center gap-2 flex-1 sm:flex-initial text-xs sm:text-sm"
            >
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              Python
              <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                3.8+
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="javascript" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              <h3 className="apple-body font-semibold">JavaScript EmbedBuilder</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(jsBuilderCode, "JavaScript")}
                className="apple-button-secondary bg-transparent w-full sm:w-auto"
              >
                {copiedCode === "JavaScript" ? <Check className="h-4 w-4 ml-2" /> : <Copy className="h-4 w-4 ml-2" />}
                {copiedCode === "JavaScript" ? "تم النسخ" : "نسخ الكود"}
              </Button>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 sm:p-6 overflow-x-auto">
              <pre className="text-xs sm:text-sm text-gray-100 whitespace-pre-wrap font-mono leading-relaxed">
                <code>{jsBuilderCode}</code>
              </pre>
            </div>
            <div className="apple-card p-4 sm:p-6 rounded-xl">
              <h4 className="apple-body font-semibold mb-3">مميزات النمط الجديد:</h4>
              <ul className="space-y-2 apple-body apple-text-gray text-sm">
                <li>
                  • <strong>Method Chaining:</strong> ربط الدوال المتسلسل لسهولة الكتابة
                </li>
                <li>
                  • <strong>Type Safety:</strong> دعم TypeScript مع التحقق من الأنواع
                </li>
                <li>
                  • <strong>Template Methods:</strong> قوالب جاهزة للرسائل الشائعة
                </li>
                <li>
                  • <strong>Error Handling:</strong> معالجة محسّنة للأخطاء
                </li>
                <li>
                  • <strong>Validation:</strong> التحقق التلقائي من صحة البيانات
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="python" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              <h3 className="apple-body font-semibold">Python EmbedBuilder</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(pythonBuilderCode, "Python")}
                className="apple-button-secondary bg-transparent w-full sm:w-auto"
              >
                {copiedCode === "Python" ? <Check className="h-4 w-4 ml-2" /> : <Copy className="h-4 w-4 ml-2" />}
                {copiedCode === "Python" ? "تم النسخ" : "نسخ الكود"}
              </Button>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 sm:p-6 overflow-x-auto">
              <pre className="text-xs sm:text-sm text-gray-100 whitespace-pre-wrap font-mono leading-relaxed">
                <code>{pythonBuilderCode}</code>
              </pre>
            </div>
            <div className="apple-card p-4 sm:p-6 rounded-xl">
              <h4 className="apple-body font-semibold mb-3">المتطلبات والتثبيت:</h4>
              <ul className="space-y-2 apple-body apple-text-gray text-sm">
                <li>• Python 3.8+ (يُفضل 3.11+)</li>
                <li>
                  • <code className="bg-gray-100 px-2 py-1 rounded text-xs">pip install requests</code>
                </li>
                <li>• دعم Type Hints للتطوير الآمن</li>
                <li>• Logging مدمج لتتبع العمليات</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Zap className="h-3 w-3 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="apple-body font-semibold mb-2 apple-text-blue">مميزات EmbedBuilder Pattern:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 apple-body apple-text-gray text-sm">
                <ul className="space-y-1">
                  <li>• كود أكثر تنظيماً وقابلية للقراءة</li>
                  <li>• دعم Method Chaining المتقدم</li>
                  <li>• معالجة أخطاء محسّنة</li>
                </ul>
                <ul className="space-y-1">
                  <li>• قوالب جاهزة للاستخدام</li>
                  <li>• التحقق التلقائي من البيانات</li>
                  <li>• دعم TypeScript كامل</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
