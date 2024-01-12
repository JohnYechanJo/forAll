import "./Header.css";

const Header = ({PageName}) => {
    return (
        <div className="container">
            <button>sidebar1</button>
            <h1>{PageName}</h1>
            <button>sidebar2</button>
        </div>
    )
};

export default Header;