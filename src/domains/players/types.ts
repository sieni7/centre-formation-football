export interface Player {
  id: string
  academy_id: string
  profile_id: string
  jersey_number?: number
  position?: 'GK' | 'DEF' | 'MID' | 'FWD'
  birth_date?: string
  public_profile: boolean
  created_at: string
  updated_at?: string
  deleted_at?: string
}

export interface PlayerWithProfile extends Player {
  profiles: {
    full_name: string
    avatar_url?: string
    role: string
  }
}
