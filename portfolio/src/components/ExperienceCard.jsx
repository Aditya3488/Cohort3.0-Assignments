import { MapPin } from 'lucide-react'

export default function ExperienceCard({ entry, topOffset }) {
  return (
    <div className="sticky" style={{ top: `${topOffset}px` }}>
      <div className="rounded-3xl border border-line bg-[#161618] overflow-hidden shadow-2xl shadow-black/50 flex flex-col md:flex-row min-h-[480px] text-fixed-paper">
        {/* logo ek light chip ke andar, contain (crop nahi) hota hai —
            transparent/white-background logos dark card pe bhi saaf
            dikhne chahiye */}
        <div className="md:w-2/5 h-56 md:h-auto bg-fixed-paper/95 flex items-center justify-center shrink-0 p-10">
          {entry.logo ? (
            <img
              src={entry.logo}
              alt={entry.company || entry.school}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <span className="font-display text-6xl text-ink/20">
              {entry.company ? entry.company.charAt(0) : entry.school.charAt(0)}
            </span>
          )}
        </div>

        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
          <p className="text-xs text-fixed-muted uppercase tracking-widest mb-2 flex items-center gap-2">
            {entry.period}
            {entry.current && (
              <span className="text-accent border border-accent/40 px-2 py-0.5 rounded-full text-[10px]">
                Current
              </span>
            )}
          </p>

          {entry.isEducation ? (
            <>
              <h3 className="font-display text-3xl mb-2">{entry.degree}</h3>
              <p className="text-fixed-muted">{entry.school} · {entry.detail}</p>
            </>
          ) : (
            <>
              <h3 className="font-display text-3xl mb-1">{entry.role}</h3>
              <div className="flex items-center gap-2 text-fixed-muted text-sm mb-5">
                <span>{entry.company}</span>
                <span className="w-1 h-1 rounded-full bg-fixed-muted" />
                <span className="flex items-center gap-1"><MapPin size={12} /> {entry.location}</span>
              </div>
              <ul className="space-y-2">
                {entry.points.map((point, i) => (
                  <li key={i} className="text-fixed-muted text-sm flex gap-2">
                    <span className="text-accent shrink-0">—</span>
                    {point}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  )
}