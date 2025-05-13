const URL_BASE = `${process.env.NEXT_PUBLIC_API_URL}?action=`

export const URL_OPTIONS = URL_BASE + "options"
export const URL_HOME = URL_BASE + "front"
export const URL_MILITARY_TECH = URL_BASE + "military"
export const URL_FONT = URL_BASE + "font"
export const URL_WORKS = URL_BASE + "works"
export const URL_WORK_DETAILS = URL_BASE + "work&id="

export const ADD_EN_URL = "&lang=en"

export const EN_URL_MILITARY_TECH = URL_BASE + "military" + ADD_EN_URL
export const EN_URL_OPTIONS = URL_BASE + "options" + ADD_EN_URL
export const EN_URL_WORKS = URL_BASE + "works&page=none" + ADD_EN_URL
export const EN_URL_FONT = URL_BASE + "font" + ADD_EN_URL

