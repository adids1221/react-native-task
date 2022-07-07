import React, {useEffect, useCallback, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Button,
  Colors,
  Assets,
} from 'react-native-ui-lib';
import {MyContext, AppContext} from '../../App';

function Content({
  original_title,
  overview,
  release_date,
  vote_average,
}: {
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: string;
}) {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 2);
  }, []);

  return (
    <>
      <TouchableOpacity>
        <Text text40L purple30 center>
          {original_title}
        </Text>
        <Text
          text80
          margin-10
          numberOfLines={textShown ? undefined : 2}
          onTextLayout={onTextLayout}>
          <Text center>{overview}</Text>
          {'\n'}
          <Text center marginT-5>
            Release Date: {release_date}
          </Text>
          {'\n'}
          <Text center>Score: {vote_average}</Text>
        </Text>

        <Button
          onPress={toggleNumberOfLines}
          center
          marginT-6
          label={textShown ? 'Read less' : 'Read more'}
          size={Button.sizes.medium}
          backgroundColor={Colors.red40}
          enableShadow
        />
      </TouchableOpacity>
    </>
  );
}

export default Content;
