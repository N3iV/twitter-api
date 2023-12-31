import { ObjectId } from 'mongodb'
import { Media } from '../Other'
import { TweetAudience, TweetType } from '~/constants/enum'

interface TweetConstructor {
  _id?: ObjectId
  user_id: ObjectId
  content: string
  type: TweetType
  audience: TweetAudience
  medias?: Media[]
  parent_id: null | string
  hashtags: ObjectId[]
  mentions: string[]
  guest_views?: number
  user_views?: number
  created_at?: Date
  updated_at?: Date
}

export default class Tweet {
  _id?: ObjectId
  user_id: ObjectId
  content: string
  type: TweetType
  audience: TweetAudience
  medias?: Media[]
  parent_id: null | ObjectId
  hashtags: ObjectId[]
  mentions: ObjectId[]
  guest_views: number
  user_views: number
  created_at?: Date
  updated_at?: Date

  constructor({
    _id,
    audience,
    content,
    guest_views,
    hashtags,
    mentions,
    parent_id,
    type,
    user_id,
    user_views,
    created_at,
    medias,
    updated_at
  }: TweetConstructor) {
    const now = new Date()
    this._id = _id
    this.audience = audience
    this.content = content
    this.hashtags = hashtags
    this.mentions = mentions.map((mention) => new ObjectId(mention))
    this.parent_id = parent_id ? new ObjectId(parent_id) : null
    this.type = type
    this.user_id = user_id
    this.medias = medias
    this.user_views = user_views || 0
    this.guest_views = guest_views || 0
    this.created_at = created_at || now
    this.updated_at = updated_at || now
  }
}
