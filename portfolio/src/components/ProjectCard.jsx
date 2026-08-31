import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './icons/BrandIcons'

export default function ProjectCard({ project }) {
  return (
    <div className="project-card shrink-0 w-[80vw] md:w-[38vw] h-[65vh] rounded-2xl border border-line bg-[#161618] p-8 flex flex-col justify-between text-fixed-paper">
      <div className="w-full h-2/3 rounded-xl overflow-hidden bg-line">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="mt-6">
        <h3 className="font-display text-2xl mb-2">{project.title}</h3>
        <p className="text-fixed-muted text-sm mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full border border-line text-fixed-muted uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
            >
              <ExternalLink size={16} /> Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
            >
              <GithubIcon size={16} /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  )
}