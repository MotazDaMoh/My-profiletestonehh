/**
 * Discord EmbedBuilder Class
 * A utility class for building Discord embeds with method chaining
 */

export interface EmbedField {
  name: string
  value: string
  inline?: boolean
}

export interface EmbedAuthor {
  name?: string
  url?: string
  icon_url?: string
}

export interface EmbedFooter {
  text?: string
  icon_url?: string
}

export interface EmbedImage {
  url?: string
}

export interface EmbedThumbnail {
  url?: string
}

export interface EmbedData {
  title?: string
  description?: string
  url?: string
  color?: number
  timestamp?: string
  author?: EmbedAuthor
  fields?: EmbedField[]
  footer?: EmbedFooter
  image?: EmbedImage
  thumbnail?: EmbedThumbnail
}

export class EmbedBuilder {
  private data: EmbedData = {}

  constructor(data?: Partial<EmbedData>) {
    if (data) {
      this.data = { ...data }
    }
  }

  /**
   * Set the title of the embed
   */
  setTitle(title: string): EmbedBuilder {
    this.data.title = title
    return this
  }

  /**
   * Set the description of the embed
   */
  setDescription(description: string): EmbedBuilder {
    this.data.description = description
    return this
  }

  /**
   * Set the URL of the embed
   */
  setURL(url: string): EmbedBuilder {
    this.data.url = url
    return this
  }

  /**
   * Set the color of the embed
   */
  setColor(color: string | number): EmbedBuilder {
    if (typeof color === "string") {
      this.data.color = Number.parseInt(color.replace("#", ""), 16)
    } else {
      this.data.color = color
    }
    return this
  }

  /**
   * Set the timestamp of the embed
   */
  setTimestamp(timestamp?: Date | string): EmbedBuilder {
    if (timestamp instanceof Date) {
      this.data.timestamp = timestamp.toISOString()
    } else if (typeof timestamp === "string") {
      this.data.timestamp = timestamp
    } else {
      this.data.timestamp = new Date().toISOString()
    }
    return this
  }

  /**
   * Set the author of the embed
   */
  setAuthor(author: EmbedAuthor): EmbedBuilder {
    this.data.author = author
    return this
  }

  /**
   * Set the footer of the embed
   */
  setFooter(footer: EmbedFooter): EmbedBuilder {
    this.data.footer = footer
    return this
  }

  /**
   * Set the image of the embed
   */
  setImage(url: string): EmbedBuilder {
    this.data.image = { url }
    return this
  }

  /**
   * Set the thumbnail of the embed
   */
  setThumbnail(url: string): EmbedBuilder {
    this.data.thumbnail = { url }
    return this
  }

  /**
   * Add a field to the embed
   */
  addField(name: string, value: string, inline = false): EmbedBuilder {
    if (!this.data.fields) {
      this.data.fields = []
    }
    this.data.fields.push({ name, value, inline })
    return this
  }

  /**
   * Add multiple fields to the embed
   */
  addFields(...fields: EmbedField[]): EmbedBuilder {
    if (!this.data.fields) {
      this.data.fields = []
    }
    this.data.fields.push(...fields)
    return this
  }

  /**
   * Set all fields of the embed
   */
  setFields(fields: EmbedField[]): EmbedBuilder {
    this.data.fields = fields
    return this
  }

  /**
   * Clear all fields
   */
  clearFields(): EmbedBuilder {
    this.data.fields = []
    return this
  }

  /**
   * Remove a field by index
   */
  removeField(index: number): EmbedBuilder {
    if (this.data.fields && this.data.fields[index]) {
      this.data.fields.splice(index, 1)
    }
    return this
  }

  /**
   * Get the embed data
   */
  toJSON(): EmbedData {
    // Clean up undefined values
    const cleanData: EmbedData = {}

    if (this.data.title) cleanData.title = this.data.title
    if (this.data.description) cleanData.description = this.data.description
    if (this.data.url) cleanData.url = this.data.url
    if (this.data.color !== undefined) cleanData.color = this.data.color
    if (this.data.timestamp) cleanData.timestamp = this.data.timestamp
    if (this.data.author && this.data.author.name) cleanData.author = this.data.author
    if (this.data.footer && this.data.footer.text) cleanData.footer = this.data.footer
    if (this.data.image && this.data.image.url) cleanData.image = this.data.image
    if (this.data.thumbnail && this.data.thumbnail.url) cleanData.thumbnail = this.data.thumbnail
    if (this.data.fields && this.data.fields.length > 0) cleanData.fields = this.data.fields

    return cleanData
  }

  /**
   * Generate JavaScript code using EmbedBuilder pattern
   */
  toCode(): string {
    const embed = this.toJSON()
    let code = "const embed = new EmbedBuilder()"

    if (embed.title) {
      code += `\n  .setTitle('${embed.title.replace(/'/g, "\\'")}')`
    }

    if (embed.description) {
      code += `\n  .setDescription('${embed.description.replace(/'/g, "\\'")}')`
    }

    if (embed.url) {
      code += `\n  .setURL('${embed.url}')`
    }

    if (embed.color !== undefined) {
      code += `\n  .setColor(${embed.color})`
    }

    if (embed.timestamp) {
      code += `\n  .setTimestamp('${embed.timestamp}')`
    }

    if (embed.author) {
      const authorParts = []
      if (embed.author.name) authorParts.push(`name: '${embed.author.name.replace(/'/g, "\\'")}'`)
      if (embed.author.url) authorParts.push(`url: '${embed.author.url}'`)
      if (embed.author.icon_url) authorParts.push(`icon_url: '${embed.author.icon_url}'`)

      if (authorParts.length > 0) {
        code += `\n  .setAuthor({ ${authorParts.join(", ")} })`
      }
    }

    if (embed.footer) {
      const footerParts = []
      if (embed.footer.text) footerParts.push(`text: '${embed.footer.text.replace(/'/g, "\\'")}'`)
      if (embed.footer.icon_url) footerParts.push(`icon_url: '${embed.footer.icon_url}'`)

      if (footerParts.length > 0) {
        code += `\n  .setFooter({ ${footerParts.join(", ")} })`
      }
    }

    if (embed.image?.url) {
      code += `\n  .setImage('${embed.image.url}')`
    }

    if (embed.thumbnail?.url) {
      code += `\n  .setThumbnail('${embed.thumbnail.url}')`
    }

    if (embed.fields && embed.fields.length > 0) {
      embed.fields.forEach((field) => {
        code += `\n  .addField('${field.name.replace(/'/g, "\\'")}', '${field.value.replace(/'/g, "\\'")}', ${field.inline || false})`
      })
    }

    return code
  }

  /**
   * Create a copy of the embed builder
   */
  clone(): EmbedBuilder {
    return new EmbedBuilder(JSON.parse(JSON.stringify(this.data)))
  }
}
