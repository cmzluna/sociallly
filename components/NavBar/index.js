import { useRouter } from "next/router";
import Link from "next/link";
import Home from "components/Icons/Home";
import Search from "components/Icons/Search";
import Create from "components/Icons/Create";
import { colors } from "styles/theme";

const links = [
  { name: "Create", href: "/compose/article" },
  { name: "Home", href: "/home" },
  { name: "Search", href: "/search" },
];

const NavBar = () => {
  const router = useRouter();

  return (
    <>
      <nav>
        {links.map(({ name, href }) => {
          return (
            <>
              <div
                key={name}
                className={`baseAnchorStyle ${
                  router.pathname === href
                    ? "baseAnchorStyle_active"
                    : "baseAnchorStyle_Inactive"
                }`}
              >
                <Link href={href}>
                  <Create width={32} height={32} stroke="#09f" />
                </Link>
                <p>{name}</p>
              </div>
            </>
          );
        })}
      </nav>
      <style jsx>{`
        .baseAnchorStyle {
        }
        .baseAnchorStyle_active {
          background: radial-gradient(#0099ff77 16%, transparent 15%);
          background-size: 180px 180px;
          background-position: center;
          filter: drop-shadow(10px 5px 10px #0099ff99);
        }
        .baseAnchorStyle_Inactive {
        }
        nav {
          bottom: 0;
          padding-bottom: 10px;
          border-top: 1px solid #ccc;
          background-color: white;
          height: 69px;
          display: flex;
          justify-content: space-between;
          position: absolute;
          width: 100%;
        }
        .baseAnchorStyle {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
          position: relative;
        }
        .baseAnchorStyle:hover {
          background: radial-gradient(#0099ff22 16%, transparent 20%);
          background-size: 180px 180px;
          background-position: center;
        }
        .baseAnchorStyle p {
          border: 2px transparent black;
          position: absolute;
          bottom: -20px;
        }
        .baseAnchorStyle p:hover {
          border: 2px solid black;
          background-color: #0099ff88;
          border-radius: 20px;
          padding: 2px;
        }
        nav span:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>{" "}
    </>
  );
};

export default NavBar;
