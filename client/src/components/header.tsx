import vineHeader from '../assets/vine_header.png';

const Header: React.FC = () => {
    return(
    <header className="header">
        <h1>Be Well</h1>
        <div>
            <img src= {vineHeader} alt="Vine Header" id="vine"/>
        </div>
    </header>    
    );
};

export default Header;