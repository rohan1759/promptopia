import '@styles/globals.css';
import Nav from '@components/Nav';
import Feed from '@components/Feed';
import SessionProvider from '@components/SessionProvider';
import Provider from '@components/Provider';
import { getServerSession } from 'next-auth';

const metaData = {
    title: 'Promptopia',
    description: 'Discover & Share AI Prompts',
    };

const RootLayout = ({ children }) => {

    const session = getServerSession();
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className="main">
                        <div className='gradient' />
                    </div>
                    <main className='app'>
                        <Nav/>
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}
export default RootLayout