import { supabase } from './supabase'

/**
 * Generates a signed URL for a media asset.
 * @param path The storage path of the file
 * @param expiresIn Expiration time in seconds (default 1h)
 */
export async function getSignedUrl(path: string, expiresIn: number = 3600) {
  const { data, error } = await supabase.storage
    .from('media')
    .createSignedUrl(path, expiresIn)

  if (error) {
    console.error('Error generating signed URL:', error)
    return null
  }

  return data.signedUrl
}

/**
 * Formats file size in bytes to a human-readable string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
