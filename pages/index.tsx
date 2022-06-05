import React from 'react';
import { useStore, useEvent } from 'effector-react'
import { __INIT__, $countries } from './../assets/effector/store'
import type { NextPage } from 'next'
import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'
import { QuizContainer } from '../assets/components/QuizContainerComponent'

const Home: NextPage = () => {
	const once = React.useRef<number>(1);
	const _INIT_ = useEvent(__INIT__);
	React.useEffect(() => {
		if(once.current === 1){	
			_INIT_();
			once.current --;
		}
	}, [])

	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="This is quiz app!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AnimatePresence>
				<QuizContainer />
			</AnimatePresence>

		</div>
	)
}

export default Home
