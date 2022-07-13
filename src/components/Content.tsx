import React, {useEffect, useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Text, Button, Colors, View} from 'react-native-ui-lib';

interface ContentProps {
  title;
  text;
  onPress;
  style;
  customElement;
}

function Content({
  original_title,
  overview,
  release_date,
  vote_average,
  style,
}: {
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: string;
  style: StyleProp<ViewStyle>;
}) {
  const [textShown, setTextShown] = useState(false);
  const totalStars = 5;
  const gainedStars = 3;

  useEffect(() => {}, [textShown]);

  return (
    <View style={style}>
      <Text text50L purple30 center numberOfLines={textShown ? undefined : 1}>
        {original_title}
      </Text>
      <Text text80 margin-10 numberOfLines={textShown ? undefined : 2}>
        <Text center>{overview}</Text>
        {'\n'}
        <Text center marginT-5>
          Release Date: {release_date}
        </Text>
        {'\n'}
        <Text center marginT-5>
          Score: {vote_average}
        </Text>
      </Text>
      <Button
        onPress={() => setTextShown(!textShown)}
        center
        marginT-6
        label={textShown ? 'Read less' : 'Read more'}
        size={Button.sizes.medium}
        backgroundColor={Colors.red40}
        enableShadow
      />
    </View>
  );
}

export default Content;
