import "./Header.css"



const Header = ({title, leftChild, rightChild}) => {
    return (
        <div className="Header">
            <div className="HeaderLeft">{leftChild}</div>
            <div className="HeaderTitle">{title}</div>
            <div className="HeaderRight">{rightChild}</div>
        </div>
    )
}

export default Header;