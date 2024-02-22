import React from 'react';
import { Button, Container } from 'react-bootstrap';
import useSSMLData from '../hooks/useSSMLData';
import useSpeech, { PlayStatus } from '../hooks/useSpeech';
import { CiPlay1, CiStop1, CiPause1   } from "react-icons/ci";

interface Props {
}

const SSMLPlayer: React.FC<Props> = ({ }) => {
	const {ssmlData, loadMore, hasMore} = useSSMLData()
	const {play, stop, sentenceIndex, playStatus} = useSpeech()

	const renderIcon = () => {
		if(playStatus === PlayStatus.paused || playStatus === PlayStatus.stopped) {
			return <CiPlay1/>
		} else {
			return <CiPause1/>
		}
	}


	return (
		<Container className="bg-white p-3 rounded">
			<Container >
            <p className="p-3">
                {ssmlData?.map((sentence, i) => {
                    const isActiveSentence = i === sentenceIndex && playStatus !== PlayStatus.stopped;
                    return (
                        <React.Fragment key={`sentence${i}`}>
                            {i > 0 && ' '}
                            <span className={` ${ isActiveSentence ? 'bg-dark text-light' : 'none'}`}>
                                {sentence}
                            </span>
                        </React.Fragment>
                    );
                })}
            </p>
        	</Container>
			<Container className="d-flex justify-content-center align-items-center gap-2">
				<Button variant="success" onClick={() => play(ssmlData)}>{renderIcon()}</Button>
				<Button variant="warning" onClick={stop}><CiStop1/></Button>
				<Button variant="dark" onClick={loadMore} disabled={playStatus === PlayStatus.playing || !hasMore} >Gimme more</Button>
			</Container>
		</Container>

	);
};

export default SSMLPlayer;