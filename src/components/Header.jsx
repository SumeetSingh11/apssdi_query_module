import React from 'react';
import './Header.css';
import { Bell, HelpCircle, Search, Menu } from 'lucide-react'; // Assuming lucide-react is available or use placeholders

const Header = ({ toggleSidebar }) => {
    return (
        <header className="app-header">
            <div className="header-left">
                {/* <button className="header-icon-btn" onClick={toggleSidebar} style={{ marginRight: '0.5rem' }}>
          <Menu size={20} />
        </button> */}
                <div className="logo-container">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAMAAADUivDaAAADAFBMVEVHcEwAAABTU1OkpKTFxcVMTEwQEBAAAAA9PT0yMjKVlZVCQkKMjIx9fX2enp6BgYFra2soKCiGhoZiYmK/v7/JyclcXFyQkJCzs7PCwsKRkZGurq52dna2tra5ubmYmJioqKi5ubm9vb3////+9Pb////+//719fX39/f4+fn7/Pvv7+/z8/Po5+fZ2dn6+vrr6+vS0tLNzc7Jycn9/f3//v3m5ubk5OTOzs7i4uLs7OzU1NSvrq/NzM2zs7Pu7u7e3d7x8fHq6urg4ODc3Nzb29vQ0NCLi4vBwcGILkzW1tW5ubprKkCUlJSfn6CCMU2RkZF8Lkh3LETo6Oh9PlaFhYWbm5upqamYmJhvITPHxse/v76rq6tJGhtuL0fExMXa29toJC9jJzt+f4BzdHW2tbmAKkaOjo5VGh9cJCjLy8u8vL2RMlGMPll6eXqIiIhwJTuch5R7TV5hICtdHCOMcHpqOUzEt7ZjL0bf5uyURlt1Nk2EWGSCgoJuLjl7NU9dR1BbLzCenp6dgoyeZ3yEQVOENVLSysmST2NkRFlRLSuPhY51TWQ6gr5yW2trUl1cKz7S1tlubG1FKTBPQ0lSVFjd1diXXGvJ0uGXY3dUJjWngJFTL0GFRluqr7WHeYR0QlirdYdeUVN4YHF6IzRdR0VKOEGWoaeIk5xVP0ChoqOnp6fBrLOaL06cd4fDo6+jkZm5m6SPaHZdhrlpZnSqo61vXWKzp7CHpsh9iY8SZKRMncycmqZxvOFHIygabK2jqa7f1MShckakpKRncKpOUZRXYqSviZiylaA8VKHYz9Tu7eJ8QUV9a2z09vjPuMHo6vCbkZmck59tRErM0dPK4e1MeLaDYnZ2bHtQca1vGRxaODpkmMIzca7r7/LVtGbWtITOnFK8ik+jo6NOVaG4wNicss4zVaKvlZaomKApU6CXqs1DMiYuYqaqzuJvkri1hpa3vMQkfLuUlsHx8OPq5tYijsOln6W51OWymnpwjZ22kmqymWa5m3Ps1HhHcEymIoZGAAABAHRSTlMABT3I7zUPAiQeriydf8CLXhmUUOnyRaTa7KnVb97jttHg4wb//////////////////////////////////v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8A7zIjIwAACqRJREFUWMOcVmdYE9kaBkWxYMOCrnq9d5/nzGQmk4QUk8mQTTIZSAIkpAOhJPQSQHpvIk1QKSL23hV7773Xtfd6t/fd2+tzJ4GFuLJe7/1+ZZ585z3n+773fc/x8HhHDB4zfBAdQ8YM9vg/wnPohBF+Ayd/OMnLa9KHk0f6TZkw1Pt/AhgyethUrpDEMCETQxF/mGSKPpr4weih732AAT5TA0kmG2ZJ7ZWRYY6zPHV4HIAQLG6i7yDP9wDwHuDnRSCiIH2lUpgUmRgSrrKYYiwykGEP4SLEJJ9B/70E30kkpsb1eoulC+bzpTJ2NBePkFDM1IjUyhg1zBw36t3leI/9rYjAo5My1DESdRBAABAIIAgSwKhMvVXFViWe5UOigWPf0djBo8bDkDTcog/nKyDAYAVxlTwejuPcQBMMYIVCH6SXKNgcrxG/OuShw+QQocUtkkAFwOQ4HickSw8tRjkwU8jGcQpGMSJbrj0bArP9xvSPMHykQrxV3pWYYQIyJS6GAQCle796VAqcAcEUj8sUiGKyEzMCgWjakH4RBspEkfNVUSIUUyoJiF42vf3c5c+/+v4G6A6IwLkwQkmYrFDEf2Q/GENGMrkqiSqMBeQOf9cS9NNz589fvvz5Z6A3TA4KYjkitY5A/2lv1TJ4mAlQM+xMDMHZDIEz/cZn9x9dOP/JJ+cW90EAlK1EkDB+dhhT5PeLnnqOkhMcECcFJN+EBdwVQaD06bN58+5fuPCHj8EbIeRjSIRUHY6yR7wJMXo8kMwKEQEZn2RQcR8/D+DvPXLk5E/z9n6KgF8Ek08ijhnhfI7X2DcaMRkJUIbPgkk+BqAbHPT0mTN/n3fyyJGn98DbQScpQlXSOM5AN556+4pQfpLWn8EnnTmC02dev4g+dHTeoeegv2DyUaE00S4Wj+qDGOAFh4c6xALc5EoRvHz94tW/iv96TwD6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" alt="Logo" className="logo-img" />
                    <div className="app-title">
                        <h1>Arunachal Pradesh State Spatial Data Infrastructure</h1>
                        <span>(An Initiative under National Spatial Data Infrastructure, DST, GOI)</span>
                    </div>
                </div>
            </div>

            <div className="header-right">
                <div className="search-bar" style={{ display: 'none' }}> {/* Optional Search in Header */}
                    <Search size={18} />
                    <input type="text" placeholder="Search..." />
                </div>

                <button className="header-icon-btn" title="Notifications">
                    <Bell size={20} />
                </button>
                <button className="header-icon-btn" title="Help">
                    <HelpCircle size={20} />
                </button>

                <div className="user-profile">
                    <div className="avatar">AD</div>
                </div>
            </div>
        </header>
    );
};

export default Header;
