import { useState } from "react"

export enum PlayStatus {
	stopped = 'stopped',
	playing = 'playing',
	paused = 'paused'
}

const useSpeech = () => {
	const [playStatus, setPlayStatus] = useState<PlayStatus>(PlayStatus.stopped)
	const [sentenceIndex, setSentenceIndex] = useState<number>(0)
	
	const play = (text: string[] | null) => {
		if(!text) {
			return;
		}
		if(playStatus === PlayStatus.stopped) {
			setPlayStatus(PlayStatus.playing)
			playNext(text, sentenceIndex)
		} else if(playStatus === PlayStatus.playing) {
			speechSynthesis.pause()
			setPlayStatus(PlayStatus.paused)
		} else if(playStatus === PlayStatus.paused) {
			speechSynthesis.resume()
			setPlayStatus(PlayStatus.playing)
		}
	}

	const playNext = (text:string[], i: number) => {
		if(i >= text.length) { //no more sentences
			setPlayStatus(PlayStatus.stopped)
			setSentenceIndex(0)
			return;
		}
		const utterance = new SpeechSynthesisUtterance(text[i])
		utterance.lang = "en-GB"
		utterance.onend = () => {
			playNext(text, i + 1)
			setSentenceIndex(i + 1)
		}
		speechSynthesis.speak(utterance)
	}

	const stop = () => {
		speechSynthesis.cancel()
		setSentenceIndex(0)
		setPlayStatus(PlayStatus.stopped)
	}

	return {
		play,
		stop,
		sentenceIndex,
		playStatus
	}
}

export default useSpeech