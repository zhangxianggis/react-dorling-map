import React from "react"
import InteractionLayer from "./InteractionLayer"
import VisualizationLayer from "./VisualizationLayer"

const basicStyleFn = () => ({ fill: "gold", stroke: "black" })

class DorlingCartogram extends React.Component {
  constructor(props) {
    const {
      geoStyle = basicStyleFn,
      circleStyle = geoStyle || basicStyleFn,
      label
    } = props

    const labelFn = label === true ? d => d.id : label

    super(props)
    this.state = {
      voronoiPoints: undefined,
      geoStyleFn: typeof geoStyle === "function" ? geoStyle : () => geoStyle,
      circleStyleFn:
        typeof circleStyle === "function" ? circleStyle : () => circleStyle,
      labelFn
    }
  }

  static defaultProps = {
    size: [500, 500]
  }

  passVoronoiPoints = points => {
    this.setState({ voronoiPoints: points })
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.geoStyle !== this.props.geoStyle ||
      nextProps.circleStyle !== this.props.circleStyle
    ) {
      const {
        geoStyle = basicStyleFn,
        circleStyle = geoStyle || basicStyleFn
      } = nextProps

      this.setState({
        geoStyleFn: typeof geoStyle === "function" ? geoStyle : () => geoStyle,
        circleStyleFn:
          typeof circleStyle === "function" ? circleStyle : () => circleStyle
      })
    }
  }

  render() {
    const {
      size,
      data,
      cartogram,
      mapData,
      zoomToFit,
      sizeBy,
      onHover,
      showBorders,
      projectionType,
      customMark,
      customMarkTransition,
      transitionSeconds,
      numberOfCirclePoints,
      circlePadding = 0
    } = this.props
    const { circleStyleFn, geoStyleFn, labelFn } = this.state

    return (
      <div>
        <svg width={size[0]} height={size[1]}>
          {mapData && (
            <VisualizationLayer
              data={data}
              cartogram={cartogram}
              size={size}
              mapData={mapData}
              circleStyleFn={circleStyleFn}
              geoStyleFn={geoStyleFn}
              labelFn={labelFn}
              zoomToFit={zoomToFit}
              sizeBy={sizeBy}
              onHover={onHover}
              passVoronoiPoints={this.passVoronoiPoints}
              showBorders={showBorders}
              projectionType={projectionType}
              customMark={customMark}
              transitionSeconds={transitionSeconds}
              customMarkTransition={customMarkTransition}
              numberOfCirclePoints={numberOfCirclePoints}
              circlePadding={circlePadding}
            />
          )}
          {onHover && cartogram === true && this.state.voronoiPoints && (
            <InteractionLayer
              size={size}
              points={this.state.voronoiPoints}
              onHover={onHover}
            />
          )}
        </svg>
      </div>
    )
  }
}

export default DorlingCartogram
