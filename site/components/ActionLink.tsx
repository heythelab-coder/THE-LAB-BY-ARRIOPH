import Magnetic from "./Magnetic";

type ActionLinkProps = {
  href: string;
  label: string;
  variant?: "solid" | "ghost";
  withArrow?: boolean;
  className?: string;
};

/**
 * Bouton dont le libelle roule au survol : la copie visible sort par le haut,
 * une copie identique entre par le bas. Le mouvement est contenu dans un
 * masque de la hauteur exacte du texte, donc rien ne deborde de la pilule.
 * Le doublon est masque aux lecteurs d'ecran pour ne pas doubler le libelle.
 */
export default function ActionLink({
  href,
  label,
  variant = "solid",
  withArrow = false,
  className = "",
}: ActionLinkProps) {
  return (
    <Magnetic className={className}>
    <a
      href={href}
      className={`${variant === "solid" ? "btn-solid" : "btn-ghost"} group`}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-expo group-hover:-translate-y-full">
          {label}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0"
        >
          {label}
        </span>
      </span>

      {withArrow && (
        <span
          aria-hidden
          className="transition-transform duration-500 ease-expo group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </a>
    </Magnetic>
  );
}
