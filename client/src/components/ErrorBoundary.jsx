import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // การอัพเดท state เมื่อเกิดข้อผิดพลาด
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // การบันทึกข้อผิดพลาด
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>เกิดข้อผิดพลาด</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;