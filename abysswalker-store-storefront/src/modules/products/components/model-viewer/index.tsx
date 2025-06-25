"use client"

import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, ContactShadows, Center } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import { Container } from '@medusajs/ui'
import { HttpTypes } from '@medusajs/types'
import * as THREE from 'three'
import { get3DModelUrl, isValid3DModelUrl } from '@lib/util/3d-models'

type ModelViewerProps = {
    modelUrl: string
    className?: string
}

function Model({ url }: { url: string }) {
    const proxiedUrl = get3DModelUrl(url)
    const gltf = useGLTF(proxiedUrl)

    const clonedScene = gltf.scene.clone()

    useEffect(() => {
        // Ensure all materials are properly set up
        clonedScene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.receiveShadow = true
                if (child.material) {
                    // Ensure materials are properly configured for lighting
                    if (Array.isArray(child.material)) {
                        child.material.forEach((mat) => {
                            if (mat instanceof THREE.MeshStandardMaterial) {
                                mat.envMapIntensity = 0.5
                            }
                        })
                    } else if (child.material instanceof THREE.MeshStandardMaterial) {
                        child.material.envMapIntensity = 0.5
                    }
                }
            }
        })
    }, [clonedScene])

    return (
        <Center>
            <primitive
                object={clonedScene}
                scale={1}
                position={[0, 0, 0]}
            />
        </Center>
    )
}

function ModelWithErrorHandling({ url, onError }: { url: string; onError: (error: any) => void }) {
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        // Preload and test the model URL
        const testLoad = async () => {
            try {
                const proxiedUrl = get3DModelUrl(url)
                // Test if the URL is accessible
                const response = await fetch(proxiedUrl, { method: 'HEAD' })
                if (!response.ok) {
                    throw new Error(`Failed to load model: ${response.status}`)
                }
                setHasError(false)
            } catch (error) {
                console.error('Model URL test failed:', error)
                setHasError(true)
                onError(error)
            }
        }

        testLoad()
    }, [url, onError])

    if (hasError) {
        return null
    }

    return <Model url={url} />
}

function LoadingSpinner() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-ui-bg-subtle">
            <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-2 border-abyss-dark-accent border-t-abyss-light-accent rounded-full animate-spin"></div>
                <span className="text-sm text-abyss-text-light">Loading 3D model...</span>
            </div>
        </div>
    )
}

function ErrorFallback() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-ui-bg-subtle">
            <div className="flex flex-col items-center gap-2 p-4 text-center">
                <div className="text-red-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                </div>
                <span className="text-sm text-abyss-text-light">Unable to load 3D model</span>
            </div>
        </div>
    )
}

function ModelViewer({ modelUrl, className }: ModelViewerProps) {
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Validate the model URL
    const isValidUrl = isValid3DModelUrl(modelUrl)

    useEffect(() => {
        if (!isValidUrl) {
            setError(true)
            setIsLoading(false)
            return
        }

        setError(false)
        setIsLoading(true)
    }, [modelUrl, isValidUrl])

    const handleLoad = () => {
        setIsLoading(false)
    }

    const handleError = (error: any) => {
        console.error('3D Model loading error:', error)
        setError(true)
        setIsLoading(false)
    }

    // Don't render if URL is invalid
    if (!isValidUrl || error) {
        return (
            <Container
                className={`relative aspect-square w-full overflow-hidden bg-ui-bg-subtle ${className || ''}`}
            >
                <ErrorFallback />
            </Container>
        )
    }

    return (
        <Container
            className={`relative aspect-square w-full overflow-hidden bg-ui-bg-subtle ${className || ''}`}
        >
            {isLoading && <LoadingSpinner />}

            <div className="absolute inset-0 w-full h-full">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    style={{ width: '100%', height: '100%' }}
                    onCreated={handleLoad}
                    onError={handleError}
                    shadows
                >
                    <Suspense fallback={null}>
                        <Environment preset="studio" />
                        <ambientLight intensity={0.4} />
                        <directionalLight
                            position={[10, 10, 5]}
                            intensity={1}
                            castShadow
                            shadow-mapSize={[1024, 1024]}
                        />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} />

                        <ModelWithErrorHandling url={modelUrl} onError={handleError} />

                        <ContactShadows
                            position={[0, -1.5, 0]}
                            opacity={0.3}
                            scale={10}
                            blur={2.5}
                            far={4}
                        />

                        <OrbitControls
                            enablePan={true}
                            enableZoom={true}
                            enableRotate={true}
                            autoRotate={false}
                            autoRotateSpeed={0.5}
                            minDistance={2}
                            maxDistance={20}
                            minPolarAngle={0}
                            maxPolarAngle={Math.PI}
                            enableDamping
                            dampingFactor={0.05}
                        />
                    </Suspense>
                </Canvas>
            </div>

            {/* Controls hint */}
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                3D Model
            </div>

            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                Drag to rotate • Scroll to zoom
            </div>
        </Container>
    )
}

// Preload the GLTF loader
useGLTF.preload = (url: string) => {
    useGLTF(url)
}

export default ModelViewer
