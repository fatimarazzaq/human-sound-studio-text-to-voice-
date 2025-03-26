
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import TextToAudioConverter from '@/components/TextToAudioConverter';
import AudioPlayer from '@/components/AudioPlayer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUserConversions } from '@/utils/audioUtils';
import { AudioConversion, UserProfile } from '@/types';
import { Clock, Download, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const [conversions, setConversions] = useState<AudioConversion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mocked user profile - would come from auth context in a real app
  const userProfile: UserProfile = {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    plan: 'gold',
    charactersLeft: 43250,
    totalCharactersUsed: 6750,
  };

  useEffect(() => {
    const loadConversions = async () => {
      try {
        const results = await getUserConversions();
        setConversions(results);
      } catch (error) {
        console.error('Error loading conversions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadConversions();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-foreground/70">
                Welcome back, {userProfile.name || userProfile.email}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 glassmorphism px-4 py-2 rounded-lg">
              <p className="text-sm">
                <span className="font-medium">Plan: </span>
                <span className="capitalize">{userProfile.plan}</span>
                {' · '}
                <span className="font-medium">{userProfile.charactersLeft.toLocaleString()}</span>
                {' characters left'}
                <Link to="/pricing" className="ml-2 text-primary hover:underline text-xs">
                  Upgrade
                </Link>
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="new-conversion" className="space-y-6">
            <TabsList className="glassmorphism">
              <TabsTrigger value="new-conversion">New Conversion</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="new-conversion" className="space-y-6">
              <TextToAudioConverter 
                isLoggedIn={true}
                charactersLeft={userProfile.charactersLeft}
                charactersLimit={userProfile.plan === 'diamond' ? Infinity : (userProfile.plan === 'gold' ? 50000 : 10000)}
              />
            </TabsContent>
            
            <TabsContent value="history">
              <div className="glassmorphism rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Your Conversions</h2>
                
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : conversions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-foreground/70 mb-4">You haven't created any conversions yet</p>
                    <Button asChild>
                      <Link to="/dashboard">Create Your First Conversion</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {conversions.map((conversion) => (
                      <div key={conversion.id} className="border border-border rounded-lg p-4">
                        <div className="mb-3">
                          <h3 className="font-medium line-clamp-1">{conversion.text}</h3>
                          <div className="flex items-center text-xs text-foreground/60 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(conversion.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <AudioPlayer 
                          audioUrl={conversion.audioUrl || ''} 
                          title={conversion.text.substring(0, 30) + (conversion.text.length > 30 ? '...' : '')}
                        />
                        
                        <div className="flex justify-end mt-3 space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs"
                            onClick={() => {
                              // Download logic
                            }}
                          >
                            <Download className="h-3 w-3 mr-1" /> Download
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs text-destructive hover:text-destructive"
                            onClick={() => {
                              // Delete logic
                            }}
                          >
                            <Trash2 className="h-3 w-3 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="glassmorphism rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Your Plan</h3>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="flex flex-col md:flex-row justify-between md:items-center">
                        <div>
                          <p className="font-medium capitalize">{userProfile.plan} Plan</p>
                          <p className="text-sm text-foreground/70 mt-1">
                            {userProfile.charactersLeft.toLocaleString()} / 
                            {userProfile.plan === 'diamond' ? '∞' : 
                              userProfile.plan === 'gold' ? '50,000' : '10,000'} characters left
                          </p>
                          <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden w-full max-w-xs">
                            <div 
                              className="h-full bg-primary"
                              style={{ 
                                width: `${(userProfile.totalCharactersUsed / 
                                  (userProfile.plan === 'diamond' ? 100000 : 
                                    userProfile.plan === 'gold' ? 50000 : 10000)) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <Button className="mt-4 md:mt-0" asChild>
                          <Link to="/pricing">Manage Subscription</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Account Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="mt-1">{userProfile.email}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <p className="mt-1">{userProfile.name || 'Not set'}</p>
                      </div>
                      
                      <Button variant="outline">Edit Profile</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Security</h3>
                    <div className="space-y-4">
                      <Button variant="outline">Change Password</Button>
                      <Button variant="outline" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
