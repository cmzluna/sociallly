import Link from 'next/link'

const Timeline = ({userName}) => {
  return (
    <>
  <h1>timeline of ${userName}</h1>
  <Link href='/'>Go home </Link>
    </>
  );
};

Timeline.getInitialProps = () => {

}

export default Timeline;
