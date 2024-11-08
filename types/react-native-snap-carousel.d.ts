declare module 'react-native-snap-carousel' {
    import { Component } from 'react';
    import { FlatListProps, StyleProp, ViewStyle } from 'react-native';

    interface CarouselProps<T> extends FlatListProps<T> {
        data: T[];
        renderItem: ({ item, index }: { item: T; index: number }) => JSX.Element;
        sliderWidth: number;
        itemWidth: number;
        inactiveSlideScale?: number;
        inactiveSlideOpacity?: number;
        containerCustomStyle?: StyleProp<ViewStyle>;
        contentContainerCustomStyle?: StyleProp<ViewStyle>;
        layout?: 'default' | 'stack' | 'tinder';
        layoutCardOffset?: number;
    }

    export default class Carousel<T> extends Component<CarouselProps<T>> {}
}
