Common commands for this project.

### Requirements

```
brew install GraphicsMagick
brew install ImageMagick
```

### Grunt commands

#### Watch
```
grunt watch
```

#### Concatinate JS
```
grunt concat
```

#### Uglify (inline) JS
```
grunt uglify
```

#### Create PNG sprite
```
grunt sprite
```

#### SVG minimize
```
grunt svgmin
```

#### SVG sprites with PNG fallback
```
grunt svg-sprites
```

#### Compress images
```
grunt imageoptim
```

#### Compile CSS
```
grunt compass
```

### PNG Sprites

``` scss
// Yoke's banner
.yokes-banner {
  @include sprite($yokes-banner);  
}
```

### SVG background (non sprite)

``` scss
@include svg-bg('imagename', 'directory');
```

Example:
``` scss
@include svg-bg('carat-down_brown', 'other');
```