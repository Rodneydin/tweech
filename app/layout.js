
import '../styles/globals.css';
import Footer from '../components/Footer';
import { ReduxProvider } from '../redux/provider';

export const metadata = {
 title: 'Tweech',
  description: 'Nice to see you here',
};
function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}

export default RootLayout;
