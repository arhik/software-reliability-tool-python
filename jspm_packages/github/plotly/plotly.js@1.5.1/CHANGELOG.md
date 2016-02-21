# plotly.js changelog

For more context information, please read through the
[release notes](https://github.com/plotly/plotly.js/releases).

To see all merged commits on the master branch that will be part of the next plotly.js release, go to:

https://github.com/plotly/plotly.js/compare/vX.Y.Z...master

where X.Y.Z is the semver of most recent plotly.js release.

## [1.5.1] -- 2016-02-01

### Fixed
- Scattergeo and choropleth now correctly fire hover and click events [#215]
- Heatmap and contour traces are redrawn in the correct order [#194]
- Early returns in `Plotly.plot` now correctly return Promise rejections [#226]
- Soon to be deprecated `SVGElement.offsetParent` calls are removed [#222]
- Geo zoom in button is now correctly titled `Zoom in` [#219]
- All attribute description are correctly stripped from the dist files (bug
  introduce in 1.5.0) [#223]
- Insecure dev dependencies `ecstatic` and `uglify-js` are bumped [#225]
- Outdated karma-browserify dev dependency is bumped [#229]


## [1.5.0] -- 2016-01-22

### Added
- Modularize the library (first iteration). Trace types can be required in
  one-by-one to make custom plotly.js bundles of lesser size. [#180, #187, #193, #202]

### Changed
- Remove json assets from the js source files (to better support Webpack bundling) [#183]
- Update d3, tinycolor2, topojson dependencies [#195]
- Improve `'colorscale'` attribute description [#186]

### Fixed
- Fix pan mode drag delay [#188]
- Make `Plotly.deleteTrace` handle big-indices-array properly [#203]


## [1.4.1] -- 2016-01-11

### Fixed
- Click events work properly after being broken in 1.4.0 [#174]


## [1.4.0] -- 2016-01-11

### Added
- Lasso and rectangular selection interactions for scatter-marker and scatter-text traces [#154, #169]
- Un-gitignore css and svg font built files, removing post-install step and
  dependency on node-sass [#164]

### Changed
- Clean up Pie, Box and Choropleth trace module [#158, #159, #165]

### Fixed
- Surface traces correctly handle `zmin` and `zmax` attributes [#153]
- Pie trace correctly trigger hover events [#150]


## [1.3.1] -- 2016-01-04

### Fixed
- Fix `Plotly.addTraces` for gl3d and gl2d trace types [#140]


## [1.3.0] -- 2015-12-21

### Added
- Trigger click event on pie charts [#111]
- Add attribute descriptions for mesh3d trace type [#115]

### Changed
- [Internal] Trace module have now a 1-to-1 correspondence with trace type [#124]
- [Internal] Remove circularize import in colorbar and colorscale module [#136]

### Fixed
- Fixed zeroline behavior in gl3d plots [#112]
- Axis `tickangle` consistently used degrees in both svg and gl plots [#131]
- `Plotly.newPlot` destroy mode bar before plotting new one [#125]
- `Plotly.newPlot` removes all event listeners from graph div [#117]
- Fixed attribute description for scatter3d marker opacity [#114]


## [1.2.1] -- 2015-12-14

### Changed
- Improve XSS check in anchor href [#100]

### Fixed
- Fix Fifefox 42 to-image failures [#104]
- Fix error bar with type 'sqrt' logic making them visible without
  specifying the 'value' field [#91]
- Fix cartesian zoom/drag cover attributes for Firefox 31 [#92]


## [1.2.0] -- 2015-12-07

### Added
- All `Plotly.____` methods now return a promise, and pass the graph-div as an argument [#77]
- `package.json` now has `webpack` field so plotly.js can be used by webpack users [#68]
- Add support for rgba colours in pie-charts [#63]

### Changed
- Optimized by calling window.getComputedStyle only once [#81]
- Improved npm install process for topojson file resolve [#48]

### Fixed
- Fixed geo-plot promises [#52]
- Typo fixed in `No DOM element` error message [#64]
- Fix hover labels with hoverinfo 'text' [#70]
- Fix scaling for gl3d error bars [#74]


## [1.1.1] -- 2015-12-01

### Fixed
- Fix `displayModeBar` plot config logic [#57]
- Fix length-1 bins count as ascending in `Lib.findBin` [#47]
- Fix jasmine test runner on windows [#46]


## [1.1.0] -- 2015-11-25

### Added
- Add three plot config options: `modeBarButtonsToRemove`,
  `modeBarButtonsToAdd` and `modeBarButtons` which combine
  to add the ability to remove specific mode bar buttons add
  custom mode bar buttons and fully customize the mode bar.

### Fixed
- Fix installation from npm3 [#12]
- Fix UMD in plotly.js dist files [#18]
- Fix for blank elements in a text array [#31]

## [1.0.0] -- 2015-11-17

First fully open source release.

### Added
- Add 2D WebGL plot engine

### Changed
- Save to cloud is now done via a modebar button by default,
  the `'Edit chart'` link is still available through the
  `'showLink'` plot config.
- Better double-click notifier CSS

### Fixed
- Fix `Plotly.newPlot` 3D and geo bug.
- Fix `plotly_click` event bug in latest Chrome and Firefox.

### Known limitations
- Different plot types cannot be mixed in subplots.
- 2D WebGL has no image test support.
- Click and hover events are not hooked for gl3d, geo and gl2d
  plot types.
- Polar chart are under-developed.
