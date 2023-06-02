import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { setupStore } from './redux/store.ts';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axiosInterceptor from './configurations/axios/interceptor.ts';

const store = setupStore();
const { dispatch } = store;
axiosInterceptor(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);
