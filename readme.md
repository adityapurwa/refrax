# Refrax

Refrax turns your React component into a reactive component where it will
automatically updates when you changed your model. This might
be against **Thinking in React** guidelines. 

Refrax utilize ES6 property getter/setter to detect changes.

*The name Refrax originated from Refraction, because it try to refract
your model changes into your React component.*

## Example

Start by creating your model schema.
```javascript
const model = new RefractModel({
    schema(){
        return {
            name: 'John Doe'
        }
    }
})
```

Then wrap your component with `<RefractComponent>`, passing your
model to the `<RefractComponent>`.
```jsx harmony
ReactDOM.render(<RefraxComponent model={model}><MyComponent/></RefraxComponent>)    
```

Then you can change your model directly and Refrax will refract that
changes into your React component.

```jsx harmony
this.props.model.name = 'Jane Doe';
```

You can run the [test/index.html](test/index.html) file and see it in action.

## IMPORTANT

This is not a production grade project, I am creating this as one of my
learning materials on React. I am inspired by Vue reactive model and try
to implement it without looking at Vue or React code at all.

Because I am not familiar with React, I might not be utilizing it to
the fullest and some optimization might be needed (e.g `forceUpdate()` 
is called to refract the model changes, probably bad, not really sure).

## CONTRIBUTION

You can help contributing to this project by writing documentation, doing
optimization, or implementing new feature.