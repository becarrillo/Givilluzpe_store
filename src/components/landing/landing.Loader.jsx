import React from "react"
import ContentLoader from "react-content-loader";

const SkeletonScreen = props => {
    return (
        <ContentLoader
            speed={3}
            width={315}
            height={435}
            viewBox="0 0 290 367"
            backgroundColor="#f3f3f3"
            foregroundColor="#2e3436"
            {...props}
        >
            <rect x="150" y="170" rx="0" ry="0" width="1" height="1" />
            <rect x="0" y="86" rx="0" ry="0" width="139" height="258" />
        </ContentLoader>
    )
} 

function Loader() {

    return (
        <div className="grid grid-rows-2 grid-cols-2 gap-1 p-7">
            <SkeletonScreen />
            <SkeletonScreen />
            <SkeletonScreen />
            <SkeletonScreen />
        </div>
    )
}

export default Loader;