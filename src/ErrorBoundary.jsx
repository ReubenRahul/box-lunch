import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch( error, errorInfo ) {
        // logError
    }

    render() {
        
        const renderComponent = this.state.hasError  ? ( <h1> Something went wrong ...</h1> ) : this.props.children;
        return (
            renderComponent
        )
    }
}

export default ErrorBoundary;