import { useState, useEffect } from 'react'

const SECTIONS = [
  'about',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'languages',
  'hobbies',
  'contact',
]

export function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: [0, 0.25, 0.5] }
    )

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return active
}
