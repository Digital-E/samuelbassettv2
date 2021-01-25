import Link from 'next/link'

const Container = ({href, children}) => {


    return (
        <Link href={href} scroll={false}>
            <a>
                {children}
            </a>
        </Link>)
}

export default Container;