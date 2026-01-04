import React from 'react';
import { signInWithGoogle, logOut } from '../utils/firebase';

function AuthButton({ user, onAuthChange }) {
    const handleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error('Sign in failed:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    if (user) {
        return (
            <div className="auth-container">
                <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="user-avatar"
                />
                <span className="user-name">{user.displayName?.split(' ')[0]}</span>
                <button className="auth-btn sign-out" onClick={handleSignOut}>
                    Sign Out
                </button>
                <span className="sync-badge" title="Syncing to cloud">☁️</span>

                <style jsx>{`
                    .auth-container {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                    }
                    .user-avatar {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        border: 2px solid var(--primary);
                    }
                    .user-name {
                        font-weight: 600;
                        color: var(--text-main);
                        font-size: 0.9rem;
                    }
                    .auth-btn {
                        padding: 0.4rem 0.8rem;
                        border-radius: 8px;
                        border: none;
                        font-size: 0.8rem;
                        cursor: pointer;
                    }
                    .sign-out {
                        background: #f5f5f5;
                        color: #666;
                    }
                    .sign-out:hover {
                        background: #eee;
                    }
                    .sync-badge {
                        font-size: 1rem;
                    }
                    @media (max-width: 600px) {
                        .user-name {
                            display: none;
                        }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <button className="auth-btn sign-in" onClick={handleSignIn}>
            <span className="google-icon">G</span>
            Sign in to Sync

            <style jsx>{`
                .sign-in {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: white;
                    color: #333;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    border: 1px solid #ddd;
                    font-size: 0.85rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .sign-in:hover {
                    background: #f5f5f5;
                    border-color: var(--primary);
                }
                .google-icon {
                    background: linear-gradient(135deg, #4285f4, #34a853, #fbbc05, #ea4335);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: 700;
                    font-size: 1rem;
                }
            `}</style>
        </button>
    );
}

export default AuthButton;
